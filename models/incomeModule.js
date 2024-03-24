const mongoose = require('mongoose');

const IncomeSchema = new mongoose.schema(
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
      type: Date,
      require: true,
      trim: true,
    },
    category: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      maxLength: 20,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Income', IncomeSchema);
