const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;
require('dotenv').config();
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('comment', 'root', 'secret', {
    host: 'comments-db',
    dialect: 'mysql',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
});


class Comment extends Model {}
Comment.init({
  body: DataTypes.STRING,
  author: DataTypes.STRING
}, { sequelize, modelName: 'comment' });


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('comments service');
});

app.post('/comment/:id', async function(req, res) {
    
    // TODO: obtener id de la pelicula
    const id = req.params.id;

    // TODO: realizar testing sobre este endpoint
    // TODO: hacer pull request en github.
    // TODO: crear Github Action para este repositorio


    await sequelize.sync();
    const comment = await Comment.create({
        body: req.query.description,
        author: req.query.author,
        movie_id: req.params.id
    });
    console.log(comment.toJSON());

    res.send(comment.toJSON());

    // TODO: guardarmos el comentario en la base de datos


});

app.get('/logout', function(req, res) {
    res.send('logout page');
});

app.get('/login', function(req, res) {
    res.send('login page');
});
  


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})