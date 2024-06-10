import { IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class loginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
    
  };
  