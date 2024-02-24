import mysql, { Pool } from 'mysql2/promise';

const mysqlConnection: Pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Asdf1346!",
    database: "fornecedor",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default mysqlConnection;
