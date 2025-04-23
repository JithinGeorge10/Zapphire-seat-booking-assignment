import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
  } from 'sequelize-typescript';
  
  @Table({ tableName: 'jwt_blacklist' })
  export class JwtBlackList extends Model {
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    token!: string;
  
    @CreatedAt
    @Column({
      field: 'created_at',
      type: DataType.DATE,
    })
    createdAt!: Date;
  
    @UpdatedAt
    @Column({
      field: 'updated_at',
      type: DataType.DATE,
    })
    updatedAt!: Date;
  }
  