import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAdminSignIn } from './admin.dto';

@Injectable()
export class AdminService {
  adminSignIn(data: IAdminSignIn) {
    if (data.username !== 'admin' || data.password !== 'password') {
      throw new HttpException('wrong credentials', HttpStatus.BAD_REQUEST);
    }
    return "jwt";
  }
}
