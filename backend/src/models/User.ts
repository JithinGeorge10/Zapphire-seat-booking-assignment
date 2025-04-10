import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  Unique,
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Unique('unique_username')
  @Column(DataType.STRING)
  username!: string;

  @Unique('unique_email')
  @Column(DataType.STRING)
  email!: string;

  @Unique('unique_phone')
  @Column(DataType.STRING)
  phone!: string;

  @Column(DataType.STRING)
  password!: string;

  @CreatedAt
  @Column({
    field: 'created_at',
    type: DataType.DATE, 
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({ 
    field: 'updated_at' ,
    type: DataType.DATE,
  })
  updatedAt!: Date;
}
