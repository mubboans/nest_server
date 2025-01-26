import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseProviders } from './database.provider';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    SequelizeModule.forRootAsync(databaseProviders[0]), // Use the provider
  ],
  providers: [...databaseProviders], // Register the provider
  exports: [...databaseProviders], // Export the provider for other modules
})
export class DatabaseModule { }
