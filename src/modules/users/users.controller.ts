import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, getUsetDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../database/entities/user.entity';
import { Response } from 'express';

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto, res);
  }

  @Get()
  @ApiCreatedResponse(
    {
      type: getUsetDto,
      isArray:true,
      description: 'Sample all user payload',
    }
  )
  findAll(@Res() res: Response) {
    return this.usersService.findAll(res);
  }

  @Get(':id')
  @ApiParam({name:'id'})
  findOne(@Res() res: Response, @Param('id') id: string) {
    return this.usersService.findOne(res,+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  update(@Res() res: Response, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(res,+id, updateUserDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  remove(@Res() res: Response, @Param('id') id: string) {
    return this.usersService.remove(res, +id);
  }
}
