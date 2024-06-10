import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateAddressDto } from 'src/admin/dtos/CreateAddress.dto';
import { AdminsService } from 'src/admin/services/admins/admins.service';
import { JWTAuthGuardAdmin } from 'src/middleware/auth/jwt-auth.guard';

@Controller('admins')
export class AdminsController {
    constructor(private adminsService : AdminsService){}


    @Post('create-address')
    @UseGuards(JWTAuthGuardAdmin)
    async createAddress (@Body(new ValidationPipe({ whitelist: true })) CreateAddressDetails: CreateAddressDto){
        await this.adminsService.createAddress(CreateAddressDetails)
        return {message : 'Address created successfully'}
    }

    @Get('users')
    @UseGuards(JWTAuthGuardAdmin)
    async getUsers (){
        const users = await this.adminsService.getUsers()
        return {users : users}
    }

    @Get('address')
    @UseGuards(JWTAuthGuardAdmin)
    async getAddress (){
        const Address = await this.adminsService.getAddress()
        return {Address : Address}
    }
    

    //user adress
    @Post(':addressId/users/:userId')
    @UseGuards(JWTAuthGuardAdmin)
    async addAdressToUser(
      @Param('addressId', new ParseIntPipe()) addressId: number,
      @Param('userId', new ParseIntPipe()) userId: number,
            ) {
          if (isNaN(+addressId) || isNaN(+userId)) {
            throw new BadRequestException('adressId and userId must be numbers');
          }
          await this.adminsService.addAdressToUser(addressId,userId);
          return {message : 'adress added to user successfully'}
    }



    @Delete(':addressId/users/:userId')
    @UseGuards(JWTAuthGuardAdmin)
    async deleteAdressToUser(
      @Param('addressId', new ParseIntPipe()) addressId: number,
      @Param('userId', new ParseIntPipe()) userId: number,

    ){
       if (isNaN(+addressId) || isNaN(+userId)) {
        throw new BadRequestException('addressId and userId must be numbers');
      }
      await this.adminsService.removeDoctorFromClinic(addressId,userId);
      return {message : 'address deleted from user successfully'}
    }


}
