const { executeQuery } = require('../config/database');
const moment = require('moment-timezone');

const convertToUTC7 = (time) => {
  if (!time) return null; 

  return moment(time).tz('UTC').format('YYYY-MM-DD HH:mm:ss');
};

const getdataVangLai = async (page, pageSize) => {
    try {
        const offset = (page - 1) * pageSize; // Tính toán OFFSET
        const result = await executeQuery(`
            SELECT *
            FROM [dbo].[KhachHang]
            WHERE [LoaiKH] = N'Vãng lai'
            ORDER BY idKhachHang 
            OFFSET ${offset} ROWS
            FETCH NEXT ${pageSize} ROWS ONLY;
        `);

        const idKhachHang = result.map(row => row.idKhachHang);
        const idDV = result.map(row => row.idDV);
        const TGcheckin = result.map(row => convertToUTC7(row.TGcheckin)); // UTC+7

        return { idKhachHang, idDV, TGcheckin };
    } catch (err) {
        console.error('Error fetching data:', err);
        throw err; // Throw the error để controller xử lý
    }
};

module.exports = { getdataVangLai };
