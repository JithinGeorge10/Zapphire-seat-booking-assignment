
import {Client} from 'pg'
import dotenv from 'dotenv';
dotenv.config();

import { PG_URI } from '../utils/constants';
const client = new Client({
  connectionString: PG_URI(),
  ssl: {
    rejectUnauthorized: false, // Important for Render SSL
  }
});

client.query('SELECT NOW()', (err:any,res:any) => {
  if (err) {
    console.error(err.stack);
  } else {
    console.log('Current time:', res.rows[0]);
  }
  client.end();
});

export default client