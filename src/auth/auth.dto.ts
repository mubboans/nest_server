import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsEnum, IsNumber } from 'class-validator';

// src/auth/auth.dto.ts


export class LoginDto {
  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  password: string;
}

export class RegisterDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty({ required: false, enum: ['user', 'admin'] })
  role: string;

  @IsString()
  @ApiProperty({ required: true, enum: ['user', 'admin', 'viewer', 'other'] })
  type?: string;

  @IsEmail()
  @ApiProperty({required:true})
  email?: string;

  @IsNumber()
  @ApiProperty({ required: true })
  contact?: number;

}
