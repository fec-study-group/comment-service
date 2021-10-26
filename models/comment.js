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