import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/typeorm/entities/user';
import { createUserParams, loginParams, updateProfileParams } from 'src/utils/types';
import { validate } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { Countrie } from 'src/typeorm/entities/countrie';
import { Address } from 'src/typeorm/entities/address';


@Injectable()
export class UsersService {
    constructor (
        private jwtService : JwtService,
        @InjectRepository(User) 
        private UserRepository : Repository<User>,
        @InjectRepository(Countrie) 
        private CountrieRepository : Repository<Countrie>,
        @InjectRepository(Address) 
        private AddressRepository : Repository<Address>,
    ){}

    async createUser(createUserDetails : createUserParams){
        const email = createUserDetails.email;
        //user duplicates
        const userDuplicates = await this.UserRepository.findOne({ where: { email: email } });
        if (userDuplicates) {
          throw new BadRequestException(`"${email}" already exists"`);
        }
        const hashedPassword = await bcrypt.hash(createUserDetails.password, 10); // hash the password
        const newUser = this.UserRepository.create({
            firstName : createUserDetails.firstName,
            secondName : createUserDetails.secondName,
            lastName : createUserDetails.lastName,
            password : hashedPassword,
            email : createUserDetails.email,
            isAdmin : false,
            createdAt: new Date(),
          });
        // Validate the new user
        const errors = await validate(newUser);
        if (errors.length > 0) {
            throw new HttpException(`Validation failed: ${errors.join(', ')}`, HttpStatus.BAD_REQUEST);
        }
        this.UserRepository.save(newUser);
        return
    }

    async getMyAccount(userId : number){
        const user = await this.UserRepository.findOne({
            where: { id: userId },
            select : ['id','firstName','secondName','lastName','isAdmin','birthDay','countrie','createdAt','gender','phoneNumber'],
            relations :['countrie']
        });
        if (!user) {
            throw new HttpException(
                `user with id ${userId} not found`,
                HttpStatus.NOT_FOUND,
              );
        }
        return user;

    }


    async getAddress(userId : number){
        const user = await this.UserRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new HttpException(
                `user with id ${userId} not found`,
                HttpStatus.NOT_FOUND,
              );
        }
        const address = await this.AddressRepository.find({
            where : {
                userAddress : {
                    user : user
                }
            }
        })
        if (address.length === 0) {
            throw new HttpException(`No address found for this User`, HttpStatus.NOT_FOUND);
          }
        return address;
    }

    async login(loginDetails : loginParams){
        const { email, password } = loginDetails;
        const user = await this.UserRepository.findOne({where: { email: email }});
        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }
          const isPasswordMatch = await bcrypt.compare(password, user.password); // compare the hashed passwords
          if (!isPasswordMatch) {
            throw new UnauthorizedException('Invalid credentials');
          }
          const payload = {
            userId: user.id,
            isAdmin : user.isAdmin
          };
          return {
            access_token: this.jwtService.sign(payload),
            isAdmin : user.isAdmin
          };      
    
  
    }
    async getcountries(){
        const countries = await this.CountrieRepository.find();
        if(countries.length == 0)
            {
                throw new BadRequestException(`no countrie exists"`);
            }
        return countries
    }
    async updateProfile(userId : number , countrieId : number , updateProfileDetails : updateProfileParams){
        const user = await this.UserRepository.findOne({where: { id: userId }});
        if (!user) {
            throw new HttpException(
                `user with id ${userId} not found`,
                HttpStatus.NOT_FOUND,
              );
        }
        const countrie = await this.CountrieRepository.findOne({where: { countrieId : countrieId }});
        if (!countrie) {
            throw new HttpException(
                `countrie with id ${countrieId} not found`,
                HttpStatus.NOT_FOUND,
              );
        }

        user.firstName = updateProfileDetails.firstName;
        user.secondName = updateProfileDetails.secondName;
        user.lastName = updateProfileDetails.lastName;
        user.phoneNumber = updateProfileDetails.phoneNumber;
        user.birthDay = updateProfileDetails.birthDay;
        user.gender = updateProfileDetails.gender;
        user.countrie = countrie;

        await this.UserRepository.save(user);
        
    }
}
