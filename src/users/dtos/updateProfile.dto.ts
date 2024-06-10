import { IsDateString, IsEnum, IsNotEmpty, IsNumberString, IsString, Length} from "class-validator";

export class updateProfileDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;


    @IsNotEmpty()
    @IsString()
    secondName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsEnum(['male', 'female'])
    gender: string ;

    @IsNumberString()
    phoneNumber: string ;


    @IsNotEmpty()
    @IsDateString()
    birthDay: string;


  };
  