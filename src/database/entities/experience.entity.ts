import { Model, BelongsTo } from "sequelize-typescript";
import { Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Employee } from "./employee.entity";
import { Student } from "./student.entity";
import { User } from "./user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Table({ tableName: 'Experience', timestamps: true })
export class Experience extends Model<Experience> {

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
  position: string;

  @ApiProperty()
  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  salary: number;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  startDate: Date;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  endDate: Date;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  reasonForLeaving: string;


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
