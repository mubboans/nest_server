import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOtpDto {
  @ApiProperty({
    description: 'Enter otp type [login,verification,forgot-password]',
    example: 'login',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Enter email',
    example: 'test@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'Phone number',
    example: '934567890',
  })
  @IsMobilePhone()
  @IsOptional()
  phone: string;

}

export class VerifyOtpDto {
  @ApiProperty({
    description: 'enter email',
    example: '123456',
  })
  otpCode: string;

  @ApiProperty({
    description: 'Enter otp type [login,verification,forgot-password]',
    example: 'login',
  })
  type: string;

  @ApiProperty({
    description: 'Enter email',
    example: 'test@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'Phone number',
    example: '934567890',
  })
  @IsMobilePhone()
  @IsOptional()
  contact: string;
}
