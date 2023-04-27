'use strict'

const Article = require("../models/articulosModel")
const jwt = require('jwt-simple')

const addArticle = (req, res) => {
    const params = req.body
    const newPost = new Article()

    try {
        const decoded = jwt.decode(req.headers.authorization.replace("Bearer ", ""), "mySecretPassword")

        newPost.user = decoded.user
        newPost.title = params.title
        newPost.description = params.description
        newPost.price = params.price

        if (decoded.rol === "admin") {
            newPost.save().then(
                (savedArticle) => {
                    res.status(200).send({ Article: savedArticle })
                },
                err => {
                    res.status(500).send({ message: "Could not add the article.", err })
                }
            )
        } else {
            res.status(401).send({ message: "Unauthorized Function for not Admin users." })
        }

    } catch (error) {
        res.status(401).send({ message: 'Token missing or invalid.' })
    }
}

const getArticles = (req, res) => {
    Article.find({})
        .then((article) => {
            console.log(article)
            res.status(200).send({ allArticles: article })
        })
        .catch((err) => {
            res.status(500).send({ message: 'Could not delete the game from the wishlist.', err })
        })
}

module.exports = {
    addArticle, getArticles
}