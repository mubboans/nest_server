import { ApiProperty } from '@nestjs/swagger';
import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';


@Table({
  tableName:'Donation',
  timestamps: true
})
export class Donation extends Model<Donation> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: Date.now()
  })
  receiptNo: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mode: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
  })
  checkno: string;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
  })
  dated: Date;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
  })
  drawnOn: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
  })
  donatedAs: string;

  @ApiProperty()
  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  amount: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
  })
  fortrust: string;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  creationdate: Date;
}
