const express = require('express');
const app = express();
const session = require('express-session');
var cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const passport = require('passport');
const path = require('path');
require("./app/config/db");
require("./app/models/index");

// session config
app.use(
    session({
        secret: "sadsadsadsadsa",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hour
    }),
);
// url encoded data read
app.use(express.urlencoded({ extended: true }));
// json encoded data
app.use(express.json());
//cookieParser
app.use(cookieParser());

// Passport config
app.use(passport.initialize());
app.use(passport.session());
require('./app/config/pasport');
app.use(passport.authenticate('remember-me'));


// create static file path
app.use(express.static('public'));

// rourt serat 
app.listen(5000, () => {
    console.log('listening on port 5000');
})
const web = require('./routes/web');

// Router 
app.use('/', web);

// set view engine defaults
app.set('views', path.join(__dirname, 'resources/views'));
app.engine(
    'hbs',
    hbs({
        extname: '.hbs',
        defaultLayout: false,
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    }),
);
app.set('view engine', 'hbs');