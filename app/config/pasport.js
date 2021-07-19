var passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const RememberMeStrategy = require('passport-remember-me').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Token = require("../models/Token");
const utils = require('./utils')

passport.use(new LocalStrategy(
	async function (username, password, done) {
		try {
			const user = await User.findOne({ where: { email: username } });
			if (user === null) {
				return done(null, false, { message: 'Wrong Username' });
			}
			bcrypt
				.compare(password, user.password)
				.then((match) => {
					if (match) {
						return done(null, user, { message: 'Logged in succesfully' });
					}
					return done(null, false, { message: 'Wrong username or password' });
				})
				.catch(() => {
					done(null, false, { message: 'Something went wrong' })
				});

		} catch (error) {
			done(null, false, { message: 'Something went wrong' });
		}
	}
));

passport.use(new RememberMeStrategy(
	async function (token, done) {
		try {
			const availableToken = await Token.findOne({ where: { token } });
			if (availableToken === null) return done(null, false);
			const user = await User.findOne({ where: { id: availableToken.userId } });
			if (user === null) return done(null, false);
			await Token.destroy({ where: { token } })
			return done(null, user);
		} catch (error) {
			return done(error);
		}
	},
	async function (user, done) {
		try {
			var token = utils.randomString(64);
			await Token.create({
				token: token,
				userId: user.id,
			})
			return done(null, token);

		} catch (error) {
			return done(error);
		}
	}
));
passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
	await User.findByPk(id)
		.then((user) => {
			if (user) {
				done(null, user);
			}
		})
		.catch(() => {
			done(null, false, { message: 'Something went wrong' });
		});
});
