const _ = require('lodash');
const { mongoose } = require('../db/mongoose');
const { isEmail } = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: value => isEmail(value),
      message: '{VALUE} is not a valid email',
    },
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  tokens: [{
    access: {
      type: String,
      require: true,
    },
    token: {
      type: String,
      require: true,
    },
  }],
});

UserSchema.methods.toJSON = function toJSON() {
  const user = this;
  const userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function generateAuthToken() {
  const user = this;
  const access = 'auth';
  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();
  user.tokens.push({ access, token });
  return user.save().then(() => token);
};

UserSchema.statics.findByToken = function findByToken(token) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
// eslint-disable-next-line no-underscore-dangle
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
};

UserSchema.statics.findByCredentials = function findByCredentials(email, password) {
  const User = this;
  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject();
      }
      return bcrypt.compare(password, user.password)
        .then((res) => {
          if (res) {
            return Promise.resolve(user);
          }
          return Promise.reject();
        });
    });
};

UserSchema.pre('save', function save(next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then((hash) => {
        user.password = hash;
        next();
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
