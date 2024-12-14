const { validateUser } = require('../services/CRUDservice');
const {getBarChart} = require('../services/getDataChart');
const {getPieChart} = require('../services/getDataPie');
const {getLineChart} = require('../services/getDataLine');
const {getInformation} = require('../services/getinformation');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const getDashBoard = async (req, res) => {
  // res.render('dashboard.ejs');
  // JWT from cookie
  const token = req.cookies.jwt;
  if (!token) {
    return res.redirect('/');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(">>> User info from JWT:", decoded);

    //Render data BarChart
    const chartData = await getBarChart(req,res);
    const chartPie = await getPieChart(req,res);
    const chartLine = await getLineChart(req,res);
    const dataMember = await getInformation(req,res);
    // console.log(">>> Chart Data: ", chartData);
    // console.log(">>> Pie Data: ", chartPie);
    // console.log(">>> Line Data: ", chartLine);
    // console.log(">>> Member Data: ", dataMember);
    
    res.render('dashboard.ejs', { 
      user: decoded,
      chartData: chartData,
      chartPie: chartPie,
      chartLine: chartLine,
      dataMember: dataMember
     });
  } catch (err) {
    console.error(">>> Invalid JWT:", err);
    res.clearCookie('jwt'); // Delete token valid
    res.redirect('/');
  }
};

const loginPage = async (req, res) => {
  res.render('login-new.ejs',{error: null });
};

const getLoginAdmin = async (req, res) => {
  const { username, password } = req.body;

  console.log(">>> username =", username, ">>> password", password);

  const user = await validateUser(username, password);

  // if (user) {
  //   console.log(">>> Login successful:", user);
  //   res.redirect('/dashboard');
  // } else {
  //   console.log(">>> Login failed");
  //   res.render('login-new.ejs', { 
  //     error: "Sai tài khoản hoặc mật khẩu" 
  //   });
  // }
  if (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: process.env.JWT_EXPIRES_IN } //time out
    );

    console.log(">>> Login successful, JWT:", token);

    // Save token
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 60 * 60 * 1000 // 1hour
    });

    res.redirect('/dashboard');
  } else {
    console.log(">>> Login failed");
    res.render('login-new.ejs', { error: "Sai tài khoản hoặc mật khẩu" });
  }
};
const logOut = async (req, res) => {
  res.clearCookie('jwt'); // Xóa cookie chứa JWT
  res.redirect('/');  // Chuyển hướng về trang đăng nhập
};
module.exports = {
  loginPage,
  getLoginAdmin,
  getDashBoard,
  logOut
};
