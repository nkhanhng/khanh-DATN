const passport = require('passport')

const checkRole = (roles) => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();

const passportAuthentication = passport.authenticate('jwt',{session:false})

module.exports = {
  checkRole,
  passportAuthentication
};
