const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

router.post('/add', (req, res) => {
    Comment.findOne({pageName: req.body.name}, (err, page) => {
        if (page) {
            let mycomments = [...page.comments]
            mycomments.push({
                comment: req.body.message,
                name: req.body.userName
            })
            page.comments = mycomments
            page.save()
            res.json(page.comments)
        } else {
            let mycomments = []
            mycomments.push({
                comment: req.body.message,
                name: req.body.userName
            })
            let newPage = new Comment({
                pageName: req.body.name,
                comments: mycomments
            })
            newPage.save()
            res.json(newPage.comments)
        }
    })
})

router.post('/currcomments', (req, res) => {
    console.log(req.body.name)
    Comment.findOne({pageName: req.body.name}, (err, page) => {
        if (page) {
            console.log('in the get current comments if block', page)
            res.json(page.comments)
        } else {
            let newPage = new Comment({
                pageName: req.body.name
            })
            newPage.save()
            res.json(newPage.comments)
        }
    })
})

module.exports = router;
