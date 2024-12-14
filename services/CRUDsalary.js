const { executeQuery } = require('../config/database');

const insertsalaryData = async () => {
    try {
        const result = await executeQuery(`
            INSERT INTO [dbo].[ChiTietBanKeLuong] 
            (
                [ThangKeLuong], 
                [idNhanVien], 
                [TienLuongCung], 
                [NgayCongChuan], 
                [NgayTinhLuong], 
                [PhuCap], 
                [TongLuong], 
                [ThucLinh], 
                [TrangThai]
            )
            OUTPUT 
                INSERTED.idChiTietBanKeLuong,
                INSERTED.ThangKeLuong,
                INSERTED.idNhanVien,
                INSERTED.TienLuongCung,
                INSERTED.NgayCongChuan,
                INSERTED.NgayTinhLuong,
                INSERTED.PhuCap,
                INSERTED.TongLuong,
                INSERTED.ThucLinh,
                INSERTED.TrangThai
            SELECT 
                FORMAT(CAST(CC.Thang AS DATE), 'yyyy-MM') AS ThangKeLuong, 
                CC.idNhanVien,                                
                CD.TienLuong AS TienLuongCung,                 
                CC.NgayCongChuan,                             
                CC.NgayDiLam,                                 
                CD.PhuCap,                                    
                (CD.TienLuong + CD.PhuCap) AS TongLuong,      
                (CD.TienLuong + CD.PhuCap) AS ThucLinh,       
                1 AS TrangThai                                 
            FROM 
                [dbo].[ChamCong] CC
            JOIN 
                [dbo].[NhanVien] NV ON CC.idNhanVien = NV.idNhanVien
            JOIN 
                [dbo].[NhanVienChucDanh] NCD ON NV.idNhanVien = NCD.idNhanVien
            JOIN 
                [dbo].[ChucDanh] CD ON NCD.idChucDanh = CD.idChucDanh
            WHERE
                FORMAT(CAST(CC.Thang AS DATE), 'yyyy-MM') = FORMAT(GETDATE(), 'yyyy-MM');
        `);

        // console.log("Tính lương thành công:", result);
        return result; // Trả về dữ liệu đã được chèn
    } catch (err) {
        console.error('Error fetching data:', err);
        throw err;
    }
};

module.exports = { insertsalaryData };
