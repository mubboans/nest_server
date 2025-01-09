import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty({ message: 'Name Cannot be empty custom' })
  name: string;

  contact: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: Date;
  updatedDate: Date;
  createdBy: string;
}
