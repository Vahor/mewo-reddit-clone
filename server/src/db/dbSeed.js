import fs from 'fs';
import db from './index';

const migration = fs.readFileSync('src/db/dbSeed.sql', 'utf-8');
db.exec(migration);
