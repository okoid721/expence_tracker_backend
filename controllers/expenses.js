const ExpensesSchema = require('../models/expensesModule');
exports.addExpenses = async (req, res) => {
  const { title, amount, category, date } = req.body;
  const expenses = ExpensesSchema({
    title,
    amount,
    category,
    date,
  });

  try {
    if (!title || !amount || !category || !date) {
      return res.status(400).json({ message: 'All  fields are required' });
    }
    if (amount <= 0 || !amount === 'number') {
      return res
        .status(401)
        .json({ message: 'Amount must me  greater than zero.' });
    }
    await expenses.save();
    res.status(200).json({ message: 'expenses added' });
  } catch (error) {
    console.log('error in expenses.js:', error);
    res.status(500).json({ message: 'server error' });
  }
  console.log(req.body);
  console.log(expenses);
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await ExpensesSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.log('error in getExpenses:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.deleteExpenses = async (req, res) => {
  const { id } = req.params;
  ExpensesSchema.findByIdAndDelete(id)
    .then((expenses) => {
      res.status(200).json({ message: 'Expenses deleted successfully!' });
    })
    .catch((error) => {
      console.log('error deleting expenses:', error);
      res.status(500).json({ message: 'Server Error' });
    });
};
