import { Module } from '@nestjs/common';
import { ResponseHelperService } from '../services/response-helper.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtHelperService } from '../services/jwt-helper.service';
import { MODEL_PROVIDERS } from 'src/database/entities/entity.provider';

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
  providers: [ResponseHelperService, JwtHelperService, ...MODEL_PROVIDERS],
  exports: [ResponseHelperService, JwtHelperService, ...MODEL_PROVIDERS]
})
export class SharedModule {

}
