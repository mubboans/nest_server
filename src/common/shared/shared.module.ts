import { Module } from '@nestjs/common';
import { ResponseHelperService } from '../services/response-helper.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtHelperService } from '../services/jwt-helper.service';
import { ErrorService } from '../error/error.service';

@Module({
  imports:[JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'), // Get JWT_SECRET from .env
      signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }, // Get JWT_EXPIRES_IN from .env
    }),
    inject: [ConfigService],
  })],
  controllers:[],
  providers: [ResponseHelperService, JwtHelperService, ErrorService],
  exports: [ResponseHelperService, JwtHelperService, ErrorService]
})
export class SharedModule {

}
