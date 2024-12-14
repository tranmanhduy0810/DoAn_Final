// services/getDataChart.js
const { executeQuery } = require('../config/database');

const getdataReceipt = async () => {
  try {
    const result = await executeQuery(`
      SELECT * from HoaDon
    `);

    const idHoaDon = result.map(row => row.idHoaDon);
    const TienThanhToan = result.map(row => row.TienThanhToan);
    const MgayThanhToan = result.map(row => row.NgayThanhToan);
    const statusThanhToan = result.map(row => row.statusThanhToan);
    return {idHoaDon, TienThanhToan, MgayThanhToan, statusThanhToan };
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err; // Throw the error to be handled by controller
  }
};

module.exports = { getdataReceipt };
