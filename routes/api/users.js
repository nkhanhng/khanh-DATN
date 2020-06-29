const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const { checkRole, passportAuthentication } = require("../../middleware/auth");
const isEmpty = require("../../validation/is-empty");
//Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//@route   GET api/users
//@desc    Tests user
//@access  Public

router.get("/", (req, res) => {
  res.json({ msg: "Users Works" });
});

//@route   GET api/users/register
//@desc    Register user
//@access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //Rating
        d: "mm", //Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        role: req.body.role,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//@route   GET api/users/login
//@desc    Login user / returning JWT token
//@access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({ email }).then((user) => {
    //Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // user matched

        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          role: user.role,
        };

        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route   GET api/users/current
//@desc    Return current user
//@access  Private
router.get("/current", passportAuthentication, (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    avatar: req.user.avatar,
    email: req.user.email,
  });
});

function getAllUsers() {
  return new Promise((resolve, reject) => {
    User.countDocuments({}, (err, count) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(count);
    });
  });
}

router.get(
  "/all-user/:page",
  passportAuthentication,
  checkRole(["admin"]),
  (req, res) => {
    console.log(req.query)

    getAllUsers().then((count) => {
      const limit = 5;
      let numPage = count / limit;
      let page = req.params.page || 1;
      console.log(req.params.page)
      User.find({}, { password: 0 })
        .skip(5 * page - 5)
        .limit(limit)
        .sort({ date: -1 })
        .then((user) => {
          if (isEmpty(user)) {
            res.json({ message: "No more user" });
          } else {
            res.json({ user, numPage: Math.ceil(numPage), count, currentPage: page });
          }
        })
        .catch((err) => res.json(err));
    });
  }
);

router.delete(
  "/:id",
  passportAuthentication,
  checkRole(["admin"]),
  (req, res) => {
    Profile
        .findOneAndRemove({user: req.params.id})
        .then(() => {
            User.findOneAndRemove({_id: req.params.id})
                .then(()=> res.json({success: true}))
        })
  }
);

router.put("/follow/:id",passportAuthentication,(req,res)=>{
  User.followUser(req.params.id,req.user.id)
    .then(data => res.json({success: true, data}))
    .catch(err => res.status(500).json(err))
})

router.put("/unfollow/:id",passportAuthentication,(req,res)=>{
  User.unfollowUser(req.params.id,req.user.id)
    .then(data => res.json({success: true, data}))
    .catch(err => res.status(500).json(err))
})

router.post("/search", (req,res) => {
  console.log(req.body.name)
  User.find({ name: req.body.name })
      .then(data => res.json(data))
      .catch(err => res.status(404).json(err))
})

module.exports = router;
