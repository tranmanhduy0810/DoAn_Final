const express = require('express');
const {loginPage,getLoginAdmin,getDashBoard,logOut} = require('../controllers/homeControllers')
const router = express.Router();

// Route.Method('/route', handler)
//Admin Dashboard
router.get('/',loginPage);
router.post('/loginadmin',getLoginAdmin);
router.post('/logout',logOut);
router.get('/dashboard',getDashBoard);
//End Admin Dashboard


module.exports = router; //export default