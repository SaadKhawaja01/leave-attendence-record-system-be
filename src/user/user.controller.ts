import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/core/guards/jwt.guard';
import { IUserResponse } from './user.dto';
import { changePassword, SignIn, userPatch } from './user.model';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signin')
  async Signin(@Body() data: SignIn) {
    return await this.userService.signIn(data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('/changepassword')
  async changePassword(@Body() data: changePassword, @Req() request) {
    return await this.userService.changePassword(data, request.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch('/profile')
  async update(
    @Req() request,
    @Body() employee: userPatch,
  ): Promise<IUserResponse> {
    return this.userService.update(request.user, employee);
  }
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('leave-records')
  async leaveRecords(@Req() request) {
    return await this.userService.leaveRecords(request.user);
  }
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('leave-applications')
  async leaveApplications(@Req() request) {
    return await this.userService.leaveApplications(request.user);
  }
}
