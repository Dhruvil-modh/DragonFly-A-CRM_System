const express = require('express');
const route = express.Router()
var passport = require('passport');
var users_crediantial = require("../model/login-module");

const bcrypt = require("bcrypt");

const session = require('express-session');
const cookieParser = require('cookie-parser');

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */

 route.use(cookieParser('secret'));
 route.use(session({
     secret : 'secret',
     maxAge : 3600000,
     resave : true,
     saveUninitialized : true,
 }));
 




 //Authentacion Strategy
var localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy({ usernameField : 'email'}, (email, password, done) => {
    users_crediantial.findOne({ email : email },(err,data) => {
        if(err) throw err;
        if(!data){
            return done(null, false);
        }
        bcrypt.compare(password, data.password, (err, match) => {
            if(err){
                return done(null, false);
            }
            if(!match){
                return done(null, false);
            }
            if(match){
                return done(null, data);
            }
        });
    });
}));



passport.serializeUser(function( users_crediantial, cb){
    cb(null,  users_crediantial.id);
});


passport.deserializeUser(function(id, cb){
    users_crediantial.findById(id, function(err,  users_crediantial){
        cb(err,  users_crediantial);
    });
});








 route.use(passport.initialize());
 route.use(passport.session());



 //authentication validate
 const checkAuthenticated = function(req,res,next){
     if(req.isAuthenticated()){
         res.set('Cache-Control','no-cache , private , no-store , must-revalidate , post-check=0 , precheck=0')
         return next();
     }
     else
     {
         res.redirect('/login');
     }
 }



route.get('/', checkAuthenticated , services.homeRoutes);
route.get('/tasks',checkAuthenticated , services.homeRoutes_tasks);
route.get('/addjob',checkAuthenticated ,services.homeRoutes_firmdd);
/**
 *  @description add users
 *  @method GET /add-user
 */
 route.post('/tasks', controller.update_status);


route.get('/login', services.login);

route.post('/login', (req,res,next) => {
    passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/login'
    })(req, res, next);
});
route.get('/logout', services.logout);
/*
route.get('/login', services.login);
route.post('/login', controller.login);
route.post('/login', controller.insertuser);
*/
//route.post('/login', controller.insertuser);

route.get('/register',checkAuthenticated , services.register);
route.get('/addjob', services.addjob);
route.post('/addjob', controller.update);
/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-firm', services.update_firm);
route.post('/update_firm', controller.update_firm);

route.get('/update-task', services.update_task);
route.post('/update_task', controller.update_task);

route.get('/firm_profile:id', services.firm_profile);
route.get('/firm_profile', services.firm_profile);
// API
route.post('/register',controller.create );
route.get('/api/users', controller.find);
route.put('/addjob/:id', controller.update);
route.delete('/api/users/:id', controller.delete);



//Register User for login access
route.get('/reg', services.user_register);
route.post('/reg', controller.insertuser );



module.exports = route


