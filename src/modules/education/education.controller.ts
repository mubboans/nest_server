import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EducationService } from './education.service';
import { UpdateEducationDto } from './dto/update-education.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DonationDTO } from './dto/create-education.dto';

@ApiBearerAuth('JWT-auth')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  create(@Body() createEducationDto: DonationDTO) {
    return this.educationService.create(createEducationDto);
  }

  @Get()
  findAll() {
    return this.educationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEducationDto: UpdateEducationDto) {
    return this.educationService.update(+id, updateEducationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationService.remove(+id);
  }
}
