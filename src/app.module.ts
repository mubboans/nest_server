import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeModuleProvider } from './database/database.provider';
const configService = new ConfigService();
console.log('Database Host:', configService.get('DB_PASSWORD'));

@Module({
  imports: [AuthModule, UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    SequelizeModule.forRootAsync(
      {
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          console.log('Database Config:', {
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
          });
          return {
            dialect: 'mysql',
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            autoLoadModels: true,
            synchronize: true,
          };
        },
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
