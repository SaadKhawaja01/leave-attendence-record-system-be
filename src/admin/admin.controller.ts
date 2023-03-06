import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IAdminSignIn } from './admin.dto';
import { adminSignIn } from './admin.model';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor( private readonly adminService : AdminService){}


@Post()
adminSignIn(@Body()data:adminSignIn){
    return this.adminService.adminSignIn(data)
}


}
