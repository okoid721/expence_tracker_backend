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
const {
  addSavings,
  getSavings,
  deleteSavings,
} = require('../controllers/saving');
const { login, logout, signup } = require('../controllers/auth_controller.js');
const router = require('express').Router();

//incomes
router.post('/add-income', addIncome);
router.get('/get-incomes', getIncomes);
router.delete('/delete/:id', deleteIncome);

//expenses
router.post('/add-expenses', addExpenses);
router.get('/get-expenses', getExpenses);
router.delete('/delete-expenses/:id', deleteExpenses);

//savings
router.post('/add-saving', addSavings);
router.get('/get-saving', getSavings);
router.delete('/delete-saving/:id', deleteSavings);

//user
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
