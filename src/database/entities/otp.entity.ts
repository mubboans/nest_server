// otp.entity.ts
import { Table, Model, Column, DataType, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';

@Table({
  tableName: 'Otp',
  timestamps: true,
})
export class Otp extends Model<Otp> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  otp_type: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
  })
  otpCode: string;

  @Column({
    type: DataType.DATE,
  })
  expireAt: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isVerified: boolean;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  failedAttempts: number;

  @DeletedAt
  deletedAt: Date;
}
