import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { VARIABLE_CONSTANTS } from 'src/common/constants/variable_contants';

export const databaseProviders = [
{
    provide: VARIABLE_CONSTANTS.SEQUELIZE_CONFIG,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<SequelizeModuleOptions> => {
    return {
      dialect: VARIABLE_CONSTANTS.MYSQL as 'mysql',
      host: configService.get<string>('DB_HOST') || 'host.docker.internal',
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      autoLoadModels: VARIABLE_CONSTANTS.AUTO_LOAD_MODULE,
      synchronize: VARIABLE_CONSTANTS.SYNCHRONIZE,
      models: [User],
    };
  },
}
];
