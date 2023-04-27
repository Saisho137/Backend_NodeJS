'use strict'

const mongoose = require('mongoose')
const Post = require("../models/post")
const jwt = require('jwt-simple')

const addPost = (req, res) => {
    const params = req.body
    const newPost = new Post()

    try {
        const decoded = jwt.decode(req.headers.authorization.replace("Bearer ", ""), "mySecretPassword")

        newPost.user = decoded.user
        newPost.title = params.title
        newPost.theme = params.theme
        newPost.description = params.description

        newPost.save().then(
            (savedPost) => {
                res.status(200).send({ postCreated: savedPost })
                console.log(savedPost);
            },
            err => {
                res.status(500).send({ message: "Could not add the post info." })
            }
        )
    } catch (error) {
        console.log(error);
        res.status(401).send({ message: 'Token missing or invalid.' })
    }

}

module.exports = {
    addPost
}