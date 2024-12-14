const sql = require('mssql');
require('dotenv').config();

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    server: process.env.DB_SERVER,
    port: 1433,
    options: {
        encrypt: true,
        trustServerCertificate: true,
        connectionTimeout: 30000, // Set time connect
        requestTimeout: 30000,   // Set time request query
        pool: {
            max: 100, // Max pool clients
            min: 0,   // Min pool clients
            idleTimeoutMillis: 30000, // Time to keep idle connection
        },
    },
};

//pool connect
const pool = new sql.ConnectionPool(sqlConfig);
const poolConnect = pool.connect(); // Tạo kết nối tới pool

/** _arams mssql pool
 * @param {string} query
 * @param {Array} params 
 * @returns {Promise<Array>} 
 */
async function executeQuery(query, params = []) {
    try {
        await poolConnect; 
        const request = pool.request(); 
        for (const param of params) {
            request.input(param.name, param.type, param.value);
        }
        const result = await request.query(query);
        return result.recordset;
    } catch (err) {
        console.error("Error executing query:", err);
        throw err;
    }
}

module.exports = {
    executeQuery, // Hàm truy vấn với pool
    sql,          // Xuất đối tượng sql để sử dụng kiểu dữ liệu
};
