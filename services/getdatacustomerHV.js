const { executeQuery } = require('../config/database');
const moment = require('moment-timezone');

const convertToUTC7 = (time) => {
  if (!time) return null; 
  return moment(time).tz('UTC').format('YYYY-MM-DD HH:mm:ss');
};

const getdataHoiVien = async (page, pageSize) => {
    try {
        const offset = (page - 1) * pageSize; 
        const result = await executeQuery(`
            SELECT kh.*, kt.MaThe
            FROM [dbo].[KhachHang] kh
            LEFT JOIN [dbo].[KhoThe] kt ON kh.idThe = kt.idThe
            WHERE kh.LoaiKH = N'Hội Viên'
            ORDER BY kh.idKhachHang
            OFFSET ${offset} ROWS
            FETCH NEXT ${pageSize} ROWS ONLY;
        `);

        const idKhachHang = result.map(row => row.idKhachHang);
        const TenKH = result.map(row => row.TenKH);
        const NgaySinh = result.map(row => row.NgaySinh);
        const GioiTinh = result.map(row => row.GioiTinh);
        const DiaChi = result.map(row => row.DiaChi);
        const CCCD = result.map(row => row.CCCD);
        const NgayDK = result.map(row => row.NgayDK);
        const idNhomDV = result.map(row => row.idNhomDV);
        const TrangThai = result.map(row => row.TrangThai);
        const idThe = result.map(row => row.idThe);
        const MaThe = result.map(row => row.MaThe);
        const idDV = result.map(row => row.idDV);
        const SDT = result.map(row => row.SDT);
        const TGcheckin = result.map(row => convertToUTC7(row.TGcheckin)); // Chuyển TGcheckin sang UTC+7

        return {
            idKhachHang,
            idDV,
            TGcheckin,
            TenKH,
            NgaySinh,
            GioiTinh,
            DiaChi,
            CCCD,
            NgayDK,
            idNhomDV,
            TrangThai,
            idThe,
            MaThe,
            SDT
        };
    } catch (err) {
        console.error('Error fetching data:', err);
        throw err; // Throw the error để controller xử lý
    }
};

module.exports = { getdataHoiVien };
