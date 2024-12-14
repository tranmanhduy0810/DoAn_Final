const { executeQuery } = require('../config/database');
const getdataWorking = async () => {
    try {
      const result = await executeQuery(`
        SELECT NV.TenNhanVien, CC.Thang, CC.NgayCongChuan, CC.NgayDiLam, CC.NgayNghi, CC.NgayTinhLuong, CC.GhiChu, CC.TrangThai
        FROM [dbo].[ChamCong] CC
        JOIN [dbo].[NhanVien] NV ON CC.idNhanVien = NV.idNhanVien
        WHERE FORMAT(CC.Thang, 'yyyy-MM') = FORMAT(GETDATE(), 'yyyy-MM');

      `);
      const TenNhanVien = result.map(row => row.TenNhanVien);
      const Thang = result.map(row => row.Thang);
      const NgayCongChuan = result.map(row => row.NgayCongChuan);
      const NgayDiLam = result.map(row => row.NgayDiLam);
      const NgayNghi = result.map(row => row.NgayNghi);
      const TrangThai = result.map(row => row.TrangThai)
      return {TenNhanVien, Thang, NgayCongChuan, NgayDiLam
        ,NgayNghi,TrangThai
       };
    } catch (err) {
      console.error('Error fetching data:', err);
      throw err; // Throw the error to be handled by controller
    }
  };
  module.exports = { getdataWorking };
