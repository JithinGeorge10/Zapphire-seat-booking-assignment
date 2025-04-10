
import {Client} from 'pg'

const client = new Client({
  connectionString: 'postgresql://zapphire_task_ticket_booking_user:LOR4cBxrsbI19uc3Zpg02CVw7Ck2rRN7@dpg-cvr6thogjchc73bohrd0-a.singapore-postgres.render.com/zapphire_task_ticket_booking',
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