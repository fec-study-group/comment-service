const { Sequelize, Model, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
});


class Comment extends Model {
    static createWithValidation(comment) {
        if (!comment.body) {
            return 'Bad request';
        }

        if (!comment.author) {
            return 'Bad request';
        }


        return Comment.create(comment);
    }
}
Comment.init({
  body: DataTypes.STRING,
  author: DataTypes.STRING,
  movie_id: DataTypes.INTEGER
}, { sequelize, modelName: 'comment' });

module.exports = Comment;