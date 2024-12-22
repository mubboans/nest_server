import { Controller, Get, Query } from '@nestjs/common';

@Controller('auth/login')
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

    
}
