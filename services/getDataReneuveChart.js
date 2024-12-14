const { executeQuery } = require('../config/database');

const getBarChartReneuve = async (timeframe = 'day') => {
  try {
    let dateCondition = '';
    let groupBy = '';
    let selectDatePart = '';
    let timePeriods = [];

    if (timeframe === 'day') {
      dateCondition = `
        WHERE NgayThanhToan >= CAST(CAST(GETDATE() AS DATE) AS DATETIME)
        AND NgayThanhToan < DATEADD(DAY, 1, CAST(CAST(GETDATE() AS DATE) AS DATETIME))
      `;
      groupBy = 'DATEPART(HOUR, NgayThanhToan)';
      selectDatePart = 'DATEPART(HOUR, NgayThanhToan)';
      timePeriods = Array.from({ length: 24 }, (_, i) => `${i}h`);  // 24 giờ trong ngày
    } else if (timeframe === 'week') {
      dateCondition = `
        WHERE NgayThanhToan >= DATEADD(DAY, -6, CAST(CAST(GETDATE() AS DATE) AS DATETIME))
        AND NgayThanhToan < DATEADD(DAY, 1, CAST(CAST(GETDATE() AS DATE) AS DATETIME))
      `;
      groupBy = 'DATEPART(DAY, NgayThanhToan)';
      selectDatePart = 'DATEPART(DAY, NgayThanhToan)';
      timePeriods = ['Ngày 1', 'Ngày 2', 'Ngày 3', 'Ngày 4', 'Ngày 5', 'Ngày 6', 'Ngày 7']; // 7 ngày trong tuần
    } else if (timeframe === 'month') {
      dateCondition = `
        WHERE NgayThanhToan >= DATEADD(DAY, -29, CAST(CAST(GETDATE() AS DATE) AS DATETIME))
        AND NgayThanhToan < DATEADD(DAY, 1, CAST(CAST(GETDATE() AS DATE) AS DATETIME))
      `;
      groupBy = 'DATEPART(DAY, NgayThanhToan)';
      selectDatePart = 'DATEPART(DAY, NgayThanhToan)';
      timePeriods = Array.from({ length: 30 }, (_, i) => `Ngày ${i + 1}`);  // 30 ngày trong tháng
    } else {
      // default
      dateCondition = `
        WHERE NgayThanhToan >= CAST(CAST(GETDATE() AS DATE) AS DATETIME)
        AND NgayThanhToan < DATEADD(DAY, 1, CAST(CAST(GETDATE() AS DATE) AS DATETIME))
      `;
      groupBy = 'DATEPART(HOUR, NgayThanhToan)';
      selectDatePart = 'DATEPART(HOUR, NgayThanhToan)';
      timePeriods = Array.from({ length: 24 }, (_, i) => `${i}h`);  // 24 giờ trong ngày
    }

    const result = await executeQuery(`
      SELECT 
        ${selectDatePart} AS Period, 
        COUNT(*) AS OrderCount, 
        ISNULL(SUM(TienThanhToan), 0) AS TotalRevenue
      FROM HoaDon
      ${dateCondition}
      AND statusThanhToan = 1
      GROUP BY ${groupBy}
      ORDER BY Period;
    `);

    const orderCounts = [];
    const totalRevenues = [];

    for (let i = 0; i < timePeriods.length; i++) {
      orderCounts[i] = 0;
      totalRevenues[i] = 0;
    }
    result.forEach(row => {
      const periodIndex = timePeriods.indexOf(`Ngày ${row.Period}`);  // convert numper to String
      if (periodIndex !== -1) {
        orderCounts[periodIndex] = row.OrderCount;
        totalRevenues[periodIndex] = row.TotalRevenue;
      }
    });

    return { timePeriods, orderCounts, totalRevenues };
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err; // Throw the error to be handled by controller
  }
};

module.exports = { getBarChartReneuve };
