import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType, CreatedAt, DeletedAt, UpdatedAt, PrimaryKey, AutoIncrement, Default, HasOne } from 'sequelize-typescript';
import { Employee } from './employee.entity';
import { Student } from './student.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
  VIEWER = 'viewer',
  OTHER = 'other',
}
@Table({
  tableName: 'Users',
  paranoid: true,
  timestamps: true,
})
export class User extends Model<User> {

  @PrimaryKey
  @AutoIncrement
  @ApiProperty()
  @Column({ type: DataType.INTEGER })
  public id: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  contact: number;

  @ApiProperty()
  @Column({
    allowNull: false,
    validate: {
      isEmail: true,
    },
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty()
  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    defaultValue: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: DataType.ENUM(...Object.values(UserType)),
    defaultValue: UserType.USER,
  })
  type: UserType;

  @Column({
    defaultValue: "https://ucarecdn.com/0d26e991-266c-491f-a842-6e2874527e9a/userprofile.jpg"
  })
  profileImg: string

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isDeleted: boolean;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  createdBy: number;


  @HasOne(() => Employee)
  employee: Employee;

  @HasOne(() => Student)
  student: Student;
}

