const mysql = require('mysql2');
// 创建连接池，设置连接池的参数
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb',
    connectionLimit: 3,
  });
  const promisePool = pool.promise();
  module.exports = promisePool
