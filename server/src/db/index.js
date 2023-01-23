import Database from 'better-sqlite3';
import config from '../config';

const db = new Database(config.databaseFilename);

export default db;
