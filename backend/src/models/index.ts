import { Sequelize, DataTypes } from "sequelize";
import UserModel from "./User";

const sequelize = new Sequelize(/* your config here */);

const User = UserModel(sequelize); // <-- IMPORTANT: this returns the real model instance

export { sequelize, User };
