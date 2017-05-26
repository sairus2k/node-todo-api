const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const mockUsers = [
  {
    _id: userOneId,
    email: 'sairus@examplte.com',
    password: 'userOnePass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString(),
    }],
  },
  {
    _id: userTwoId,
    email: 'sairus2k@example.com',
    password: 'userTowPass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({ _id: userTwoId, access: 'auth' }, 'abc123').toString(),
    }],
  },
];

const mockTodos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator: userOneId,
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333,
  _creator: userTwoId,
}];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(mockUsers[0]).save();
    const userTwo = new User(mockUsers[1]).save();
    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

const populateTodos = (done) => {
  Todo.remove({}).then(() => Todo.insertMany(mockTodos)).then(() => done());
};

module.exports = { mockUsers, populateUsers, mockTodos, populateTodos };
