import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const DatabasePathLocal = './sqlLocal/database.sql';

export async function getDatabaseConnection() {
  const database = await open({
    filename: DatabasePathLocal,
    driver: sqlite3.Database
  });

  await database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      phone TEXT PRIMARY KEY,
      name TEXT NULL,
      FirstInteraction TEXT
    );
  `);

  console.log('Database connection successful.');
  return database;
}