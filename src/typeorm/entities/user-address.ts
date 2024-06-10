import {
    Column,
      Entity,
      JoinColumn,
      ManyToOne,
      PrimaryGeneratedColumn,
    } from 'typeorm';
  import { IsNumber, IsOptional, Min, Validate } from 'class-validator';
import { User } from './user';
import { Address } from './address';
  
  @Entity({ name: 'userAddresses' })
  export class UserAddress {
    @PrimaryGeneratedColumn({ type: 'bigint' })
      id: number;
  
   
      @ManyToOne(() => User, (user) => user.userAddress)
      public user: User
  
      @ManyToOne(() => Address, (address) => address.userAddress)
      public address: Address;
  
  

  }
  