const IncomeSchema = require('../models/incomeModule');
exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = IncomeSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    if (!title || !amount || !category || !description || !date) {
      return res.status(400).json({ message: 'All  fields are required' });
    }
    if (amount <= 0 || !amount === 'number') {
      return res
        .status(401)
        .json({ message: 'Amount must me  greater than zero.' });
    }
    await income.save();
    res.status(200).json({ message: 'income added' });
  } catch (error) {
    console.log('error in income.js:', error);
    res.status(500).json({ message: 'server error' });
  }
  console.log(req.body);
  console.log(income);
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
  } catch (error) {}
};
