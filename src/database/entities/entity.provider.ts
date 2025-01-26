
import { MODEL_CONSTANTS } from 'src/common/constants/variable_contants';
import { User } from './user.entity';
import { Employee } from './employee.entity';
import { Student } from './student.entity';
import { Education } from './education.entity';
import { Experience } from './experience.entity';
import { Donation } from './donation.entity';
import { Fee } from './fee.entity';
import { Notice } from './notice.entity';
import { Salary } from './salary.entity';
import { Timetable } from './timetable.entity';

// export const userProviders = [
//   {
//     provide: MODEL_CONSTANTS.USER,
//     useValue: User,
//   },
// ];

export const models = {
  [MODEL_CONSTANTS.DONATION]: Donation,
  [MODEL_CONSTANTS.EDUCATION]: Education,
  [MODEL_CONSTANTS.EXPERIENCE]: Experience,
  [MODEL_CONSTANTS.EMPLOYEE]: Employee,
  [MODEL_CONSTANTS.FEES]: Fee,
  [MODEL_CONSTANTS.NOTICE]: Notice,
  [MODEL_CONSTANTS.STUDENT]: Student,
  [MODEL_CONSTANTS.SALARY]: Salary,
  [MODEL_CONSTANTS.TIMETABLE]: Timetable,
  [MODEL_CONSTANTS.USER]: User,
};

export const MODEL_PROVIDERS = Object.entries(models).map(([key,model])=>({
  provide: key,
  useValue:model
}))
