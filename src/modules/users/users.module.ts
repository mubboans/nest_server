import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
// import { userProviders } from 'src/database/entities/entity.provider';
import { SharedModule } from 'src/common/shared/shared.module';


@Module({
  imports: [DatabaseModule,SharedModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
