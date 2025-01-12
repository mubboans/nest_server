import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from '../../database/entities/user.entity';
import { Response } from 'express';

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
      type:Array<User>
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
