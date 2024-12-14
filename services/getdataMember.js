const { executeQuery } = require('../config/database');
const getdataMember = async () => {
    try {
      const result = await executeQuery(`
        SELECT * from NhanVien
      `);
  
      const idNhanVien = result.map(row => row.idNhanVien);
      const TenNhanVien = result.map(row => row.TenNhanVien);
      const NgaySinh = result.map(row => row.NgaySinh);
      const idCCCD = result.map(row => row.CCCD);
      const GioiTinh = result.map(row => row.GioiTinh);
      const DiaChi = result.map(row => row.DiaChi);
      const SoDienThoai = result.map(row => row.SDT);
      const Gmail = result.map(row => row.Gmail);
      const TrangThai = result.map(row => row.TrangThai);
      return {idNhanVien, TenNhanVien, TenNhanVien, NgaySinh,idCCCD,GioiTinh,DiaChi
        ,SoDienThoai,Gmail,TrangThai
       };
    } catch (err) {
      console.error('Error fetching data:', err);
      throw err; // Throw the error to be handled by controller
    }
  };
  module.exports = { getdataMember };
