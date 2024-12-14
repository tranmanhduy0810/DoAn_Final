const express = require('express');
const {receiptPage} = require('../controllers/receiptController')
const {memberPage} = require('../controllers/memberController')
const {salaryPage} = require('../controllers/salaryController')
const {reveneuPage} = require('../controllers/revenueController')
const {warehousePage} = require('../controllers/warehouseController')
const {exportsalaryPage} = require('../controllers/exportsalaryController')
const {customerPage} = require('../controllers/customerController')
const {delcustomerController} = require('../controllers/delcustomerController')
const {lockcustomerController} = require('../controllers/lockcustomerController')
const router = express.Router();

router.get('/hoadon',receiptPage);
router.get('/member',memberPage);
router.get('/customer',customerPage)
router.get('/revenue', reveneuPage)
router.get('/warehouse',warehousePage)
router.post('/customer/delete',delcustomerController)
router.get('/customer/lock/:id',lockcustomerController)
router.post('/member/salary',salaryPage);
router.get('/member/salary/export-salary',exportsalaryPage);
module.exports = router; //export default
