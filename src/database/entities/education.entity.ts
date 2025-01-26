import { Model, BelongsTo } from "sequelize-typescript";
import { Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Employee } from "./employee.entity";
import { Student } from "./student.entity";
import { User } from "./user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Table({ tableName: 'Education', timestamps: true })
export class Education extends Model<Education> {

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  schoolOrCollegeName: string;

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  passingYear: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  location: string;

  @ApiProperty()
  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  cgpiOrPercentage: number;

  // Foreign keys
  @ApiProperty()
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ApiProperty()
  @ForeignKey(() => Employee)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  employeeId: number;

  @ApiProperty()
  @ForeignKey(() => Student)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  studentId: number;


  @BelongsTo(() => User)
  user: User;
  @BelongsTo(() => Employee)
  employee: Employee;
  @BelongsTo(() => Student)
  student: Student;

}
