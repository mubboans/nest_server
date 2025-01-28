import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './common/shared/shared.module';
import { AuthenticatorMiddleware } from './common/middlewares/authenticator.middleware';
import { DonationModule } from './modules/donation/donation.module';
import { EducationModule } from './modules/education/education.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { FeesModule } from './modules/fees/fees.module';
import { NoticeModule } from './modules/notice/notice.module';
import { SalaryModule } from './modules/salary/salary.module';
import { StudentModule } from './modules/student/student.module';
import { TimetableModule } from './modules/timetable/timetable.module';

@Module({
  imports: [DatabaseModule, SharedModule, AuthModule, UsersModule, DonationModule, EducationModule, EmployeesModule,
    ExperienceModule, FeesModule, NoticeModule, SalaryModule, StudentModule,TimetableModule
   ],
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
