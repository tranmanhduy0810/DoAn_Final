const {getBarChartReneuve} = require('../services/getDataReneuveChart');
const {getPieChart} = require('../services/getDataPie');
const {getLineChart} = require('../services/getDataLine');

const reveneuPage = async (req, res) => {
  const { timeframe } = req.query; 

  try {
    const chartData = await getBarChartReneuve(timeframe);
    const chartPie = await getPieChart(req, res);
    const chartLine = await getLineChart(req, res);

    res.render('revenue.ejs', { chartData, chartPie, chartLine });
  } catch (err) {
    console.error('Error fetching revenue data:', err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  reveneuPage,
};
