const { mongoose } = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      require: true,
      enum: ['male', 'female'],
    },
  },

  //ceratedAt, updatedAt => Member since  at and last seen on
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
