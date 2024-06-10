import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from './user';
import { UserAddress } from './user-address';

@Entity({ name: 'addresses' })
export class Address {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    addressId: number;

    @Column({ nullable: false })
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column({ nullable: false })
    @IsNotEmpty()
    @IsString()
    city : string;


    @Column({ nullable: false })
    @IsNotEmpty()
    @IsString()
    street : string;


    
    @Column({ type: 'decimal', precision: 9, scale: 6 })
    @IsNotEmpty()
    Latitude: number;

    @Column({ type: 'decimal', precision: 9, scale: 6})
    @IsNotEmpty()
    Longitude: number;

    @Column()
    createdAt: Date;
 
    @OneToMany(() => User, (user) => user.countrie)
    user: User[] 


    
    @OneToMany(() => UserAddress, userAddress => userAddress.address)
    public userAddress: UserAddress[];

}