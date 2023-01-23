import fs from 'fs';
import db from './index';

const migration = fs.readFileSync('src/db/dbInit.sql', 'utf-8');
db.exec(migration);
