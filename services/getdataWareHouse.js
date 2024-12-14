// services/getDataChart.js
const { executeQuery } = require('../config/database');

const getWareHouse = async () => {
  try {
    const result = await executeQuery(`
	select * from KHO
    `);

    const idKho = result.map(row => row.idKho);
    const TenSP = result.map(row => row.TenSP);
    const SoLuong = result.map(row => row.SoLuong);
    const TrangThai = result.map(row => row.status_Kho);
    const GiaTien = result.map(row => row.Gia);
    return { idKho, TenSP, SoLuong, TrangThai,GiaTien};
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err; // Throw the error to be handled by controller
  }
};

module.exports = { getWareHouse };
