import mysql from 'mysql2/promise';

let database;

export async function getDatabaseConnection() {
    if (database) {
        return database;
    }

    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            port: process.env.MYSQL_PORT,
        });

        console.log('Conexão com o banco de dados MySQL estabelecida.');
        database = connection;
        return database;

    } catch (err) {
        console.error('Erro ao conectar ao banco de dados MySQL:', err);
        throw err;
    }
}