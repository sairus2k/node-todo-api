const {ObjectID} = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

/*
const id = '58b0f5bb94826222c02d7658';

if (!ObjectID.isValid(id)) {
  console.log('ID is not valid');
}
*/
/*

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('todo', todo);
});

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo by Id', todo);
}).catch((e) => console.log(e));
*/

User.findById('58b05001bab675188c81f312').then((user) => {
  if (!user) {
    return console.log('User not found');
  }
  console.log('User', JSON.stringify(user, undefined, 2));
}).catch((e) => {
  console.log(e);
});
