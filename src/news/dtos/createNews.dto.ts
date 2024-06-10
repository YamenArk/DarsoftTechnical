import {  IsNotEmpty, IsString} from "class-validator";

export class createNewsDto {
    @IsNotEmpty()
    @IsString()
    title: string;
  

    @IsNotEmpty()
    @IsString()
    description: string;
  };
  