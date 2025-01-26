import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { UserRole, UserType } from "../../../database/entities/user.entity";

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
  role: UserRole;

  @ApiProperty()
  type: UserType;

  isActive: boolean;
  isDeleted: boolean;
  createdDate: Date;
  updatedDate: Date;
  createdBy: string;
}

export class getUsetDto{
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  contact: string;

  @ApiProperty()
  role: UserRole;

  @ApiProperty()
  type: UserType;

  @ApiProperty()
  isActive: boolean;
}
