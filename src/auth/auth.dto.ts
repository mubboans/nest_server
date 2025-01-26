import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsEnum, IsNumber } from 'class-validator';

// src/auth/auth.dto.ts


export class LoginDto {
  @IsString()
  @ApiProperty({ default: 'test@gmail.com' })
  username: string;

  @IsString()
  @ApiProperty({ default: '1234' })
  password: string;
}

export class RegisterDto {
  @IsString()
  @ApiProperty(({ default: 'test' }))
  name: string;

  @IsString()
  @ApiProperty(({ default: '1234' }))
  password: string;

  @IsString()
  @ApiProperty({ required: false, enum: ['user', 'admin'], default: 'user' })
  role: string;

  @IsString()
  @ApiProperty({ required: true, enum: ['user', 'admin', 'viewer', 'other'], default: 'user' })
  type?: string;

  @IsEmail()
  @ApiProperty({required:true, default: 'test@gmail.com'})
  email?: string;

  @IsNumber()
  @ApiProperty({ required: true, default: 8765434526, maximum: 10, minimum: 10 })
  contact?: number;

}

export class ForgotPassword {
  @IsString()
  @ApiProperty({ default: 'test@gmail.com' })
  username: string;
}
