import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { IAdminSignIn } from "./admin.dto";

export class adminSignIn implements IAdminSignIn{
    @ApiProperty({default:"admin"})
    @IsNotEmpty()
    username: string;
    @ApiProperty({default:"password"})
    @IsNotEmpty()
    password: string;
    
}