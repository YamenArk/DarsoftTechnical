import {  IsDecimal, IsNotEmpty, IsNumber, IsString, Length} from "class-validator";

export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    city : string;

    @IsNotEmpty()
    @IsString()
    street : string;

    @IsNotEmpty()
    @IsNumber()
    Latitude: number;

    @IsNotEmpty()
    @IsNumber()
    Longitude: number;
    
  };
  