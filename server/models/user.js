const { mongoose } = require('../db/mongoose');

const User = mongoose.model('User', {
  email: {
    type: String,
    require: true,
    minlength: 1,
    trim: true
  }
});

module.exports = { User };
