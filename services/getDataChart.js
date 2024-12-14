// services/getDataChart.js
const { executeQuery } = require('../config/database');

const getBarChart = async () => {
  try {
    const result = await executeQuery(`
      SELECT 
        DATEPART(HOUR, NgayThanhToan) AS Hour, 
        COUNT(*) AS OrderCount, 
        ISNULL(SUM(TienThanhToan), 0) AS TotalRevenue
      FROM HoaDon
      WHERE 
        NgayThanhToan >= CAST(CAST(GETDATE() AS DATE) AS DATETIME)
        AND NgayThanhToan < DATEADD(DAY, 1, CAST(CAST(GETDATE() AS DATE) AS DATETIME))
        AND statusThanhToan = 1
      GROUP BY DATEPART(HOUR, NgayThanhToan)
      ORDER BY Hour;
    `);

    const hours = result.map(row => row.Hour);
    const orderCounts = result.map(row => row.OrderCount);
    const totalRevenues = result.map(row => row.TotalRevenue);
    // console.log(">>>hour:",hours)
    // console.log(">>>orderCounts:",orderCounts)
    // console.log(">>>totalRevenues",totalRevenues)
    return { hours, orderCounts, totalRevenues };
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err; // Throw the error to be handled by controller
  }
};

module.exports = { getBarChart };
