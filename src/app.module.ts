import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './common/shared/shared.module';
import { AuthenticatorMiddleware } from './common/middlewares/authenticator.middleware';

@Module({
  imports: [DatabaseModule, SharedModule, AuthModule, UsersModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthenticatorMiddleware).exclude(
      { path:'auth/login', method: RequestMethod.POST },
      { path: 'auth/register', method: RequestMethod.POST },
      { path: 'auth/forgot-password', method: RequestMethod.POST },
      { path:'/health-check', method : RequestMethod.GET}
    ).forRoutes('*');
  }
}
