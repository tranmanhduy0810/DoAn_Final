const { insertsalaryData } = require('../services/CRUDsalary');
const salaryPage = async (req, res) => {
    try{
    const dataSalary = await insertsalaryData();
    // console.log('>>>Data',dataSalary);
        res.render('salary.ejs',{dataSalary});
        // res.render('salary2.ejs',{dataSalary});
    }
    catch (error) {
        console.error('Error fetching salary data:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    salaryPage,
  };
  