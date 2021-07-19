const User = require("../../models/User");
const Token = require("../../models/Token");
const bcrypt = require("bcrypt");
const passport = require("passport");
const utils = require('../../config/utils');
const { use } = require("../../../routes/web");

module.exports = function authController() {
  return {
    index: (req, res) => {
      if (req.user) {
        res.render('index')
      } else {
        res.render('login')
      }
    },
    register: (req, res) => {
      res.render('register')
    },
    async registerPost(req, res) {
      const { username, email, password } = req.body;
      // hassing the password
      const hashedPassword = await bcrypt.hash(password, 10);
      User.create({
        username,
        email,
        password: hashedPassword,
      }).then((user) => {
        if (user) {
          return res.redirect('/')
        }
      })

    },
    login: (req, res) => {
      if (req.isAuthenticated()) {
        return res.redirect('/')
      }
      res.render('login')
    },
    postLogin: async (req, res, next) => {

      // passport.authenticate('local', { failureRedirect: '/login' })
      passport.authenticate('local', {}, async function (err, user, info) {
        if (err) {
          console.log(error);
          return next(err);
        }
        if (!user) {
          console.log("NO USER");
          return res.redirect('/login');
        }

        if (req.body.remember_me) {
          var token = utils.randomString(64);
          await Token.create({
            token: token,
            userId: user.id,
          }).then((token) => {
            if (token) {
              res.cookie('remember_me', token.token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
              return next();
            }
          }).catch((err) => {
            console.log(err)
            return done(err);
          })
        }


        req.logIn(user, function (err) {
          if (err) { return next(err); }
          return res.redirect('/');
        });
      })(req, res, next);
    },

    logout: (req, res) => {
      if (req.session) {
        res.clearCookie("remember_me");
        req.logOut();
        res.redirect('/login');
      }
    }
  }
}

// exports.login = (req, res, next) => {
//     passport.authenticate("local", function (err, user, info) {
//         if (err) {
//             console.log("here is an error", err);
//             return res
//                 .status(404)
//                 .json({ success: false, message: "something went wrong" });
//         }
//         if (user) {
//             req.logIn(user, function (err) {
//                 if (err) {
//                     return next(err);
//                 }
//                 return res.status(200).json(user);
//                 // return res.redirect('/users/' + user.username);
//             });
//         }
//         if (info) {
//             res.status(404).json({ message: info.message });
//         }
//     })(req, res, next);
// };