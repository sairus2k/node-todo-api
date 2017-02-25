const {ObjectID} = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');


/*
Todo.remove({}).then((result) => {
  console.log(result);
});
*/

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findByIdAndRemove('58b145302a9eeca51b1d1152').then((todo) => {
  console.log(todo);
});
