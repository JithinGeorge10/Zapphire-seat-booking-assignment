import { Model, DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public phone!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
      timestamps: true,
    }
  );

  return User;
};
