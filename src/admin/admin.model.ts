import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { IAdminSignIn } from "./admin.dto";

export class adminSignIn implements IAdminSignIn{
    @ApiProperty()
    @IsNotEmpty()
    adminId: string;
    @ApiProperty()
    @IsNotEmpty()
    password: string;
    
}