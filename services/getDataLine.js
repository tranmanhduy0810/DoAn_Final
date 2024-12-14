// services/getDataChart.js
const { executeQuery } = require('../config/database');

const getLineChart = async () => {
  try {
    const result = await executeQuery(`
      SELECT 
        CAST(NgayThanhToan AS DATE) AS Ngay,
        SUM(TienThanhToan) AS TongDoanhThu
        FROM 
            [dbo].[HoaDon]
        WHERE 
            CAST(NgayThanhToan AS DATE) BETWEEN CAST(DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()), 0) AS DATE) -- Ngày đầu tháng
            AND CAST(EOMONTH(GETDATE()) AS DATE) -- Ngày cuối tháng
            AND statusThanhToan = 1
        GROUP BY 
            CAST(NgayThanhToan AS DATE)
        ORDER BY 
            Ngay ASC;
    `);

    const Ngay = result.map(row => row.Ngay);
    const TongDoanhThu = result.map(row => row.TongDoanhThu);
    return { Ngay, TongDoanhThu };
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err; // Throw the error to be handled by controller
  }
};

module.exports = { getLineChart };
