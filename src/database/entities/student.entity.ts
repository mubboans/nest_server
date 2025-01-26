import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType, CreatedAt, DeletedAt, UpdatedAt, PrimaryKey, AutoIncrement, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.entity';

@Table({
  tableName: 'Student',
  paranoid: true,
  timestamps: true,
})
export class Student extends Model<Student> {

  @PrimaryKey
  @AutoIncrement
  @ApiProperty()
  @Column({ type: DataType.INTEGER })
  public id: number;

  @ApiProperty()
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  placeofbirth: string;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  dateofbirth: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    defaultValue:'male'
  })
  gender: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
  })
  bloodgroup: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
  })
  city: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
  })
  pincode: string;

  @ApiProperty()
  @Column({
    type: DataType.TEXT,
  })
  address: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
  })
  rollnumber: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
  })
  admissiondate: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nationality: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mothertongue: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  emergencyContactName: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  emergencyContactNumber: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  emergencyContactAddress: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  emergencyContactEmail: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
  })
  disability_detail: string;

  @ApiProperty()
  @Column({
    type: DataType.BOOLEAN,
    allowNull:false
  })
  is_disabled: string;

  @ApiProperty()
  @Column({
    type: DataType.TEXT,
  })
  currentSTD: string;

  @ApiProperty()
  @Column({
    type: DataType.TEXT,
  })
  schoolTiming: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isDeleted: boolean;

  @DeletedAt public deletedAt: Date;

  @BelongsTo(() => User)
  user: User;

}


