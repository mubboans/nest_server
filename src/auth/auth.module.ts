import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SharedModule } from 'src/common/shared/shared.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [AuthController, DatabaseModule, SharedModule],
  providers: [AuthService]
})
export class AuthModule {}
