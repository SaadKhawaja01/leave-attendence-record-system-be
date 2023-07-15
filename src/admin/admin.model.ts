import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IAdminSignIn, IPatchApplication } from './admin.dto';

export class adminSignIn implements IAdminSignIn {
  @ApiProperty({ default: 'admin@xyz.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ default: 'password' })
  @IsNotEmpty()
  password: string;
  @ApiProperty({ default: true })
  @IsNotEmpty()
  isAdmin: boolean;
}

export class PatchApplication implements IPatchApplication {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  applicationId: string;
  @ApiProperty({ default: 'Accepted' })
  @IsNotEmpty()
  @IsString()
  status: string;
}
