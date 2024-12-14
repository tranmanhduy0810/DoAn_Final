const { executeQuery } = require('../config/database');

const delcustomerController = async (req, res) => {
    try {
        const { id } = req.body; 
        console.log(req.body); // Log dữ liệu từ form
        if (!id) {
            return res.status(400).send('ID không hợp lệ');
        }

        const result = await executeQuery(`
            DELETE FROM [dbo].[KhachHang]
            WHERE idKhachHang = ${id};
        `);

        return res.redirect('/dashboard/customer');
    } catch (err) {
        console.error('Error deleting customer:', err);
        return res.redirect('/dashboard/customer');
    }
};

module.exports = { delcustomerController };
