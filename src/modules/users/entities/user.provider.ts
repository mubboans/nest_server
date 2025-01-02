
import { MODEL_CONSTANTS } from 'src/common/constants/variable_contants';
import { User } from './user.entity';

export const userProviders = [
  {
    provide: MODEL_CONSTANTS.USER,
    useValue: User,
  },
];
