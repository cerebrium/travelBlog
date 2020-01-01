const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const User = require('../models/user');

router.post('/add', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        Comment.findOne({name: req.body.name})
    })
})