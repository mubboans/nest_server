import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';

@Controller('auth')
export class AuthController {

    @Get('')
    findAll(@Query('role') role?: 'admin' | 'user') {
        if (!role){
            throw new Error('role is required')
        }
       return [{
        name:'Mubashir Ansari',
        age:25,
        residence:'Mumbai'
       }]
    }

    @Post('')
    Login(@Body() payload: Partial<User>){}

}
