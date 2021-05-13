import express from 'express'
import mongoUsers from '../models/UserModel.js'
import connectEnsureLogin from 'connect-ensure-login'
import passport from 'passport';
import mongoose from 'mongoose';
import UserModel from '../models/UserModel.js';

const router = express.Router();

/* Login:
* Takes username & password request and authenticates using passport salt.
*/
router.route('/login').post(passport.authenticate('local'),(req,res)=>{
    console.log('authentication was successful',req.user.username);
    res.status(200).send({"username":req.user.username, "shelter":req.user.shelter});
})

/* Register:
* 1. Using supplied username/password, runs register with new User Schema, that includes shelter.
* 2. Register is passport plugin within usermodel Schema
*/
router.route('/register').post((req,res) => {
    if(!req.body.username || !req.body.password) {
        res.status(500).send('Need both Username and Password')
    } else {
        mongoUsers.register(new UserModel({username: req.body.username, shelter: req.body.shelter}), req.body.password, function(err){
            if (err){
                console.log('error while user register!', err);
                return next(err)
            }
            res.status(201).send('user registered!')
        })
    }
})

/**
 * Implement Passport Ensure Login
 */

router.route('/login').get((req,res) => {
    console.log('Login Component');
});

router.route('/').get((req,res)=>{
    connectEnsureLogin.ensureLoggedIn();
    console.log('Send to private html');
})

router.route('/user').get((req,res) => {
    connectEnsureLogin.ensureLoggedIn();
    res.send({user: req.user})
});

export default router;