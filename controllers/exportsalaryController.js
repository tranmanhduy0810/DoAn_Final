const { insertsalaryData } = require('../services/CRUDsalary');
const ExcelJS = require('exceljs');
const exportsalaryPage = async (req, res) => {
    try {
        const data = await insertsalaryData(); // Lấy dữ liệu từ database
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Salary Details');

        // Tạo header
        worksheet.columns = [
            { header: 'Tháng Kê Lương', key: 'ThangKeLuong', width: 15 },
            { header: 'ID Nhân Viên', key: 'idNhanVien', width: 10 },
            { header: 'Tiền Lương Cứng', key: 'TienLuongCung', width: 20 },
            { header: 'Ngày Công Chuẩn', key: 'NgayCongChuan', width: 20 },
            { header: 'Ngày Tính Lương', key: 'NgayTinhLuong', width: 20 },
            { header: 'Phụ Cấp', key: 'PhuCap', width: 10 },
            { header: 'Tổng Lương', key: 'TongLuong', width: 20 },
            { header: 'Thực Lĩnh', key: 'ThucLinh', width: 20 },
            { header: 'Trạng Thái', key: 'TrangThai', width: 15 }
        ];

        // Thêm data vào file Excel
        data.forEach((item) => {
            worksheet.addRow({
                ThangKeLuong: item.ThangKeLuong.trim(),
                idNhanVien: item.idNhanVien,
                TienLuongCung: item.TienLuongCung,
                NgayCongChuan: item.NgayCongChuan,
                NgayTinhLuong: item.NgayTinhLuong,
                PhuCap: item.PhuCap,
                TongLuong: item.TongLuong,
                ThucLinh: item.ThucLinh,
                TrangThai: item.TrangThai === 1 ? 'Đã Thanh Toán' : 'Chưa Thanh Toán'
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=ChiTietBanKeLuong.xlsx');
        res.send(buffer);
    } catch (error) {
        console.error('Error exporting salary data:', error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = {
    exportsalaryPage,
  };
  