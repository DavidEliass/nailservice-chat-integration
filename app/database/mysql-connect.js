import mysql from 'mysql2/promise';

let database;

export async function getDatabaseConnection() {
    if (database) {
        return database;
    }

    try {
        // Use a variável de ambiente para a string de conexão
        const connection = await mysql.createConnection(process.env.MYSQL_PUBLIC_URL);
        console.log('String de conexão do MySQL:', process.env.MYSQL_PUBLIC_URL);

        console.log('Conexão com o banco de dados MySQL estabelecida.');
        database = connection;
        return database;

    } catch (err) {
        console.error('Erro ao conectar ao banco de dados MySQL:', err);
        throw err;
    }
}