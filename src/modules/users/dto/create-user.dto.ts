import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { UserRole } from "../../../database/entities/user.entity";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name Cannot be empty custom' })
  name: string;

  @ApiProperty()
  contact: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  type: UserRole;

  isActive: boolean;
  isDeleted: boolean;
  createdDate: Date;
  updatedDate: Date;
  createdBy: string;
}
