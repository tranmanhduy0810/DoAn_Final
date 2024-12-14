// services/getDataChart.js
const { executeQuery } = require('../config/database');

const getInformation = async () => {
  try {
    const result = await executeQuery(`
	SELECT 
		nv.TenNhanVien, 
		cd.TienLuong, 
		cd.PhuCap, 
		nv.TrangThai
	FROM 
		[dbo].[NhanVien] nv
	JOIN 
		[dbo].[NhanVienChucDanh] nvc ON nv.idNhanVien = nvc.idNhanVien
	JOIN 
		[dbo].[ChucDanh] cd ON nvc.idChucDanh = cd.idChucDanh;
    `);

    const TenNhanVien = result.map(row => row.TenNhanVien);
    const TienLuong = result.map(row => row.TienLuong);
    const PhuCap = result.map(row => row.PhuCap);
    const TrangThai = result.map(row => row.TrangThai);
    return { TenNhanVien, TienLuong, PhuCap, TrangThai};
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err; // Throw the error to be handled by controller
  }
};

module.exports = { getInformation };
