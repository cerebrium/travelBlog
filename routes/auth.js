const express = require('express');
const router = express.Router();
const User = require('../models/user');

// the Google oauth signup route
router.post('/signup', (req, res) => {
    console.log(req.body)
    // find user by email, and if not found create, otherwise login
    User.findOne({email: req.body.email}, (err, user) => {
        // If there is an error, console log it and send back you have an error
        if (err) {
            console.log('------------------ there was an error ----------------------', err)
            res.json('there was an error creating or finding that account')
        }
        // if there is a user with that email address.... the oauth should log them in and send login message back
        if (user) {
            res.json('user found and logged in')
        } else {
            // if email is not found make new user, save user to database, send back user created message
            let newUser = new User(req.body)
            newUser.save()
            res.json(`new user made: ${newUser}`)
        }
    })
})

module.exports = router;