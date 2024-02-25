// Importa as bibliotecas mysql e Pool do módulo 'mysql2/promise'
import mysql, { Pool } from 'mysql2/promise';

// Cria uma instância do Pool de conexões do MySQL
const mysqlConnection: Pool = mysql.createPool({
    // Configurações da conexão com o banco de dados
    host: "localhost",          // Endereço do banco de dados
    port: 3306,                 // Porta de conexão
    user: "root",               // Nome de usuário
    password: "Asdf1346!",      // Senha do usuário
    database: "fornecedor",     // Nome do banco de dados
    waitForConnections: true,   // Espera por conexões disponíveis quando a conexão atingir o limite máximo
    connectionLimit: 10,        // Número máximo de conexões permitidas
    queueLimit: 0               // Número máximo de conexões em fila (0 indica ilimitado)
});

// Exporta a instância do Pool de conexões para que possa ser utilizada em outros arquivos
export default mysqlConnection;
