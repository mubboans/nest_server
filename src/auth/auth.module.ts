import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SharedModule } from 'src/common/shared/shared.module';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/database/entities/user.provider';
@Module({
  imports: [DatabaseModule, SharedModule],
  controllers: [AuthController],
  providers: [AuthService, ...userProviders]
})
export class AuthModule {}
