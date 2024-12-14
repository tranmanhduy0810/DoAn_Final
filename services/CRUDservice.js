const { executeQuery, sql } = require('../config/database');
const validateUser = async (username, password) => {
    try {
        const query = `
            SELECT * 
            FROM dbo.TaiKhoan 
            WHERE username = @username 
              AND pass = @password 
              AND idNhomQuyen = 1 
              AND Trangthai = 1
        `;
        const params = [
            { name: 'username', type: sql.VarChar, value: username },
            { name: 'password', type: sql.VarChar, value: password },
        ];
        const result = await executeQuery(query, params);

        return result.length > 0 ? result[0] : null;
    } catch (err) {
        console.error("Error in validateUser:", err);
        return null;
    }
};

module.exports = {
    validateUser,
};
