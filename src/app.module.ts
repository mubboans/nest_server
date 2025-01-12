import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './common/shared/shared.module';

@Module({
  imports: [DatabaseModule, SharedModule, AuthModule, UsersModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
