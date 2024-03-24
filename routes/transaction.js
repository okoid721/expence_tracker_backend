const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require('../controllers/income');
const {
  addExpenses,
  getExpenses,
  deleteExpenses,
} = require('../controllers/expenses');
const router = require('express').Router();

//incomes
router.post('/add-income', addIncome);
router.get('/get-incomes', getIncomes);
router.delete('/delete/:id', deleteIncome);

//expenses
router.post('/add-expenses', addExpenses);
router.get('/get-expenses', getExpenses);
router.delete('/delete/:id', deleteExpenses);

module.exports = router;
