import { Body, Controller, Get, Param, Post, Req, ValidationPipe ,Put, ParseIntPipe, BadRequestException, UseGuards } from '@nestjs/common';
import { JWTAuthGuardAdmin, JWTAuthGuardUser } from 'src/middleware/auth/jwt-auth.guard';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { loginDto } from 'src/users/dtos/login.dto';
import { updateProfileDto } from 'src/users/dtos/updateProfile.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private userSrevice : UsersService){}


    /////////////admin

    @Get('admin/:userId')
    @UseGuards(JWTAuthGuardAdmin)
    async getUserAddress(
        @Param('userId', new ParseIntPipe()) userId: number,
    ){
         // Check if userId is a number
         if (isNaN(+userId) ) {
            throw new BadRequestException('userId  must be numbers');
          }
        const MyAddress = await this.userSrevice.getAddress(userId)
        return {UserAdress : MyAddress}
    }








    //////////////////////////////user
    @Post()
    async createUser(@Body(new ValidationPipe({ whitelist: true })) createUserDto: CreateUserDto){
        await this.userSrevice.createUser(createUserDto)
        return {message : 'User created successfully'}
    }

    @Get()
    @UseGuards(JWTAuthGuardUser)
    async getMyAccount(
        @Req() request
    ){
        const userId = request.userId
        const myAccount = await this.userSrevice.getMyAccount(userId)
        return {AccountDetails : myAccount}
    }


    @Get('myAddress')
    @UseGuards(JWTAuthGuardUser)
    async getMyAddress(
        @Req() request
    ){
        const userId = request.userId
        const MyAddress = await this.userSrevice.getAddress(userId)
        return {UserAdress : MyAddress}
    }

    @Post('login')
    async login(@Body(new ValidationPipe({ whitelist: true })) loginDto: loginDto){
        const loginDetails = await this.userSrevice.login(loginDto);
        return {loginDetails : loginDetails};
    }

    @Get('getcountries')
    async getcountries(){
        const countries = await this.userSrevice.getcountries();
        return {countries : countries};
    }

    @Put('updateProfile/:countrieId')
    @UseGuards(JWTAuthGuardUser)
    async updateProfile(
        @Param('countrieId') countrieId: number,
        @Req() request,
        @Body(new ValidationPipe({ whitelist: true })) updateProfileDetails: updateProfileDto
        ){
        const userId = request.userId
        await this.userSrevice.updateProfile(userId,countrieId,updateProfileDetails);
        return {message : "profile updated successfully"};
    }
    


}
