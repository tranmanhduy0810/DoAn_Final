const { executeQuery } = require('../config/database');
const sql = require('mssql');

const lockcustomerController = async (req, res) => {
    try {
        const { id } = req.params; 
        console.log('Request ID:', id); 

        if (!id) {
            return res.status(400).send('ID không hợp lệ');
        }
        const result = await executeQuery(`
            UPDATE [dbo].[KhachHang]
            SET TrangThai = 2
            WHERE idKhachHang = @id
        `, [{ name: 'id', type: sql.Int, value: parseInt(id, 10) }]);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Hội viên không tồn tại');
        }
        return res.redirect('/dashboard/customer');
    } catch (err) {
        console.error('Error locking customer:', err);
        return res.redirect('/dashboard/customer');

    }
};

module.exports = { lockcustomerController };
