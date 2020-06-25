const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  followings: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

module.exports = User = mongoose.model("users", UserSchema);

module.exports.followUser = (id, currentUserId) => {
  return new Promise((resolve, reject) => {
    let message = {};
    User.findById(id)
      .then((user) => {
        if (
          user.followings.filter((flw) => flw.user.toString() === currentUserId)
            .length > 0
        ) {
          message.alreadyFollwed = true;
          reject(message);
        } else {
          user.followings.unshift({ user: currentUserId });
          user.save().then((user) => resolve(user));
        }
      })
      .catch((err) => reject(err));
  });
};

module.exports.unfollowUser = (id, currentUserId) => {
  return new Promise((resolve, reject) => {
    let message = {};
    User.findById(id)
      .then((user) => {
        // if (
        //   user.followings.filter((flw) => flw.user.toString() === currentUserId)
        //     .length > 0
        // ) {
        //   message.alreadyFollwed = true;
        //   reject(message);
        // } else {
        // }
        user.followings.pop({ user: currentUserId });
        user.save().then((user) => resolve(user));
      })
      .catch((err) => reject(err));
  });
};
