const express = require('express');
const router = express.Router();
const passport = require("passport");
const authController = require("../app/http/controllers/authController");

router.route('/').get(authController().index);
router.route('/logout').get(authController().logout);
router.route('/register').get(authController().register);
router.route('/register').post(authController().registerPost);
router.route('/login').get(authController().login);
router.route('/login').post(authController().postLogin);
// router.post('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/users/' + user.id);
//     });
//   })(req, res, next);
// });
module.exports = router;
