import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let database;

export async function getDatabaseConnection() {
    if (database) {
        return database;
    }

    try {
        const publicUrl = process.env.MYSQL_PUBLIC_URL;
        
        // Verifique se a variável de ambiente foi carregada.
        if (!publicUrl) {
            throw new Error('MYSQL_PUBLIC_URL não está configurada nas variáveis de ambiente.');
        }

        const connection = await mysql.createConnection(publicUrl);
        
        console.log('Conexão com o banco de dados MySQL estabelecida.');
        database = connection;
        return database;

    } catch (err) {
        console.error('Erro ao conectar ao banco de dados MySQL:', err);
        throw err;
    }
}