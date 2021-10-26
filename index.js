const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const Comment = require('./models/comment');

const port = 3000;
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: '*',
    })
);


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('comments service');
});

app.post('/comment/:id', async function (req, res) {
    // TODO: realizar testing sobre este endpoint

    // TODO: hacer pull request en github.

    // TODO: crear Github Action para este repositorio
    try {
        console.log(req.params.id);
        console.log(req.body);

        let data = {
            body: req.body.description,
            author: req.body.author,
            movie_id: req.params.id,
        };

        const comment = await Comment.createWithValidation(data);

        console.log(comment.toJSON());

        res.status(201).send(comment.toJSON());
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

    // TODO: guardarmos el comentario en la base de datos
});

app.get('/comments/:movie', async function (req, res) {
    const comments = await Comment.findAll({
        where: {
            movie_id: req.params.movie,
        },
    });

    console.log(comments);

    res.send(comments);
});

app.get('/logout', function (req, res) {
    res.send('logout page');
});

app.get('/login', function (req, res) {
    res.send('login page');
});

module.exports = app;

listen();

function listen() {
    if (app.get('env') === 'test') return;
    app.listen(port);
    console.log('Express app started on port ' + port);
}
