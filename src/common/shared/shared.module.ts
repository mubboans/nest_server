import { Module } from '@nestjs/common';
import { ResponseHelperService } from '../services/response-helper.service';

@Module({
  imports:[],
  controllers:[],
  providers:[ResponseHelperService],
  exports: [ResponseHelperService]
})
export class SharedModule {

}
