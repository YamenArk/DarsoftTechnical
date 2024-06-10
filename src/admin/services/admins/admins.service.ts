import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/user';
import { CreateAddressParams } from 'src/utils/types';
import { Address } from 'src/typeorm/entities/address';
import { validate } from 'class-validator';
import { UserAddress } from 'src/typeorm/entities/user-address';

@Injectable()
export class AdminsService {
    constructor (
        @InjectRepository(User) 
        private UserRepository : Repository<User>,
        @InjectRepository(Address) 
        private AddressRepository : Repository<Address>,
        @InjectRepository(UserAddress) 
        private UserAddressRepository : Repository<UserAddress>,
      
    ){}

    async createAddress (createAddressDetails : CreateAddressParams){
        const newAddress = this.AddressRepository.create({
            ...createAddressDetails,
            createdAt: new Date(),
        })
    // Validate the address 
      const errors = await validate(newAddress);
      if (errors.length > 0) {
        throw new HttpException(`Validation failed: ${errors.join(', ')}`, HttpStatus.BAD_REQUEST);
      }
    
      await this.AddressRepository.save(newAddress);
      return
    }

    async getUsers(){
      const users = await this.UserRepository.find({
        select : ['id','firstName','secondName','lastName'],
        where : {
          isAdmin : false
        }
      });
      if(users.length == 0)
        {
          throw new BadRequestException(`no users exists"`);
        }
        return users
    }


    async getAddress(){
      const Address = await this.AddressRepository.find();
      if(Address.length == 0)
        {
          throw new BadRequestException(`no Address exists"`);
        }
        return Address
    }


    async addAdressToUser(addressId : number , userId : number){
      const address = await this.AddressRepository.findOne({ where: { addressId : addressId } });
      const user = await this.UserRepository.findOne({ where: { id : userId } });
      if (!address || !user) {
          throw new HttpException('Invalid address or user ID', HttpStatus.BAD_REQUEST);
      }
      const duplicateUserAddress = await this.UserAddressRepository.findOne({ where: { address: { addressId : addressId }, user: { id:userId } } });
  
      if (duplicateUserAddress) {
        throw new HttpException('Address is already associated with User', HttpStatus.NOT_FOUND);
      }
      const newUserAddress = new UserAddress();
      newUserAddress.user = user;
      newUserAddress.address = address;
      await this.UserAddressRepository.save(newUserAddress);
    }

    async removeDoctorFromClinic(addressId : number , userId : number){
      const address = await this.AddressRepository.findOne({ where: { addressId : addressId } });
      const user = await this.UserRepository.findOne({ where: { id : userId } });
      if (!address || !user) {
          throw new HttpException('Invalid address or user ID', HttpStatus.BAD_REQUEST);
      }
      const UserAddress = await this.UserAddressRepository.findOne({ where: { address: { addressId : addressId }, user: { id:userId } } });

      if (!UserAddress) {
        throw new HttpException('Address is not associated with Doctor', HttpStatus.NOT_FOUND);
      }
  
      await this.UserAddressRepository.remove(UserAddress);
    }
}
