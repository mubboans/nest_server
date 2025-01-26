import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType, CreatedAt, DeletedAt, UpdatedAt, PrimaryKey, AutoIncrement, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.entity';

export enum EmpType {
  TEACHING = 'teaching',
  ADMINSTRATIVE = 'administrative',
  OTHER = 'other'
}


@Table({
  tableName: 'Employee',
  paranoid: true,
  timestamps: true,
})

export class Employee extends Model<Employee> {

  @PrimaryKey
  @AutoIncrement
  @ApiProperty()
  @Column({ type: DataType.INTEGER })
  public id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  referredBy: string;

  @Column({
    type: DataType.ENUM(...Object.values(EmpType)),
    defaultValue: EmpType.OTHER,
  })
  employeeType: EmpType;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nearestStation: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  distanceFromStation: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  timeToTravel: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  maritalStatus: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  stayingWith: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  financialDependence: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  qualification: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  experienceYears: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  motherTongue: string;

  @Column({
    type: DataType.STRING, // Use TEXT for larger strings
  })
  islamicVideos: string;

  @Column({
    type: DataType.TEXT, // Use TEXT for larger strings
  })
  islamicAudios: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  salary: number;

  @Column({
    type: DataType.STRING,
  })
  disability: string;

  @Column({
    type: DataType.TEXT,
  })
  essay: string;


  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isDeleted: boolean;

  @DeletedAt public deletedAt: Date;

  @BelongsTo(() => User)
  user: User;

}


