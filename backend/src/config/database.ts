import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';
import {DB_NAME,DB_USER,DB_PASSWORD,DB_HOST} from '../utils/constants'
import { Seat } from '../models/Seats';
export const sequelize = new Sequelize({
    database: DB_NAME(),
    username: DB_USER(),
    password: DB_PASSWORD(),
    host: DB_HOST(),
    port: 5432,  
    dialect: 'postgres',
    models: [User,Seat],
    logging: false,
    ssl: true,  
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
});

