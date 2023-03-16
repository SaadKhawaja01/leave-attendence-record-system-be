import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IAdminSignIn, IPatchApplication } from './admin.dto';

export class adminSignIn implements IAdminSignIn {
  @ApiProperty({ default: 'admin' })
  @IsNotEmpty()
  username: string;
  @ApiProperty({ default: 'password' })
  @IsNotEmpty()
  password: string;
}

export class PatchApplication implements IPatchApplication {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
  @ApiProperty({ default: 'Accepted' })
  @IsNotEmpty()
  @IsString()
  status: string;
}
