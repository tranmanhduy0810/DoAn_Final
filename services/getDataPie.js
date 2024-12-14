// services/getDataChart.js
const { executeQuery } = require('../config/database');

const getPieChart = async () => {
  try {
    const result = await executeQuery(`
      SELECT 
        dv.TenGoiDichVu AS TenDichVu,
        SUM(hd.TienThanhToan) AS TongDoanhThu,
        COUNT(hd.idHoaDon) AS SoLuongHoaDon
        FROM 
            [dbo].[HoaDon] hd
        JOIN 
            [dbo].[GoiDichVu] dv ON hd.idDV = dv.idDV
        WHERE 
            hd.NgayThanhToan >= DATEADD(DAY, -7, GETDATE())  
            AND hd.statusThanhToan = 1                     
        GROUP BY 
            dv.TenGoiDichVu
        ORDER BY 
        TongDoanhThu DESC;
    `);

    const TenDichVu = result.map(row => row.TenDichVu);
    const TongDoanhThu = result.map(row => row.TongDoanhThu);
    const SoLuongHoaDon = result.map(row => row.SoLuongHoaDon);
    // console.log(">>>hour:",hours)
    // console.log(">>>orderCounts:",orderCounts)
    // console.log(">>>totalRevenues",totalRevenues)
    return { TenDichVu, TongDoanhThu, SoLuongHoaDon };
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err; // Throw the error to be handled by controller
  }
};

module.exports = { getPieChart };
