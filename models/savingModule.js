const mongoose = require('mongoose');

const SavingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      require: true,
      maxLength: 20,
      trim: true,
    },
    type: {
      type: String,
      default: 'Income',
    },
    date: {
      type: String,
      require: true,
      trim: true,
    },
    category: {
      type: String,
      require: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Savings', SavingSchema);
