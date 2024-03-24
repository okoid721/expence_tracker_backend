const { addIncome, getIncomes } = require('../controllers/income');
const router = require('express').Router();

router.post('/add-income', addIncome);
router.get('/get-incomes', getIncomes);

module.exports = router;
