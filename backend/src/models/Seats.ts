import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    AllowNull,
  } from 'sequelize-typescript';
  import { User } from './User'; 
  
  @Table({ tableName: 'seats' })
  export class Seat extends Model {
    @PrimaryKey
    @Column(DataType.INTEGER)
    seatNumber!: number; // 1 to 80
  
    @Column(DataType.INTEGER)
    rowNumber!: number; // 1 to 12 (last row has only 3 seats)
  
    @AllowNull(true)
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    bookedBy!: number | null;
  
    @BelongsTo(() => User)
    user?: User;
  }
  