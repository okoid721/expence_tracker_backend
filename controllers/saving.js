const SavingSchema = require('../models/savingModule');
exports.addSavings = async (req, res) => {
  const { title, amount, category, date } = req.body;
  const saving = SavingSchema({
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
    await saving.save();
    res.status(200).json({ message: 'savings added' });
  } catch (error) {
    console.log('error in savings.js:', error);
    res.status(500).json({ message: 'server error' });
  }
  console.log(req.body);
  console.log(saving);
};

exports.getSavings = async (req, res) => {
  try {
    const savings = await SavingSchema.find().sort({ createdAt: -1 });
    res.status(200).json(savings);
  } catch (error) {
    console.log('error in getSavings:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.deleteSavings = async (req, res) => {
  const { id } = req.params;
  SavingSchema.findByIdAndDelete(id)
    .then((savings) => {
      res.status(200).json({ message: 'savings deleted successfully!' });
    })
    .catch((error) => {
      console.log('error deleting savings:', error);
      res.status(500).json({ message: 'Server Error' });
    });
};
