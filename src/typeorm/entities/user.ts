import {
    Column,
      Entity,
      ManyToOne,
      OneToMany,
      PrimaryGeneratedColumn,
    } from 'typeorm';
  import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumberString, IsString,IsOptional,IsDateString } from 'class-validator';
import { Countrie } from './countrie';
import { UserAddress } from './user-address';
  
  
  @Entity({ name: 'users' })
  export class User {
        @PrimaryGeneratedColumn({ type: 'bigint' })
        id: number;


        @Column()
        @IsNotEmpty()
        @IsString()
        firstName: string;


        @Column()
        @IsNotEmpty()
        @IsString()
        secondName: string;

        
        @Column()
        @IsNotEmpty()
        @IsString()
        lastName: string;

        @Column({unique : true})
        @IsNotEmpty()
        @IsString()
        @IsEmail()
        email: string;
    
        
        @Column()
        @IsNotEmpty()
        @IsString()
        password: string;


        @Column({ nullable: true })
        @IsOptional()  
        @IsEnum(['male', 'female'])
        gender: string | null;



        @Column()
        @IsNotEmpty()
        @IsBoolean()
        isAdmin: boolean;


        
        @Column({ nullable: true })
        @IsOptional()  
        @IsNumberString()
        phoneNumber: string | null;


        @Column({ type: 'date', nullable: true })
        @IsOptional()  
        @IsDateString()
        birthDay: string | null;

        @Column()
        createdAt: Date;


        @ManyToOne(() => Countrie, (countrie) => countrie.user)
        countrie: Countrie;


        @OneToMany(() => UserAddress, userAddress => userAddress.user)
        public userAddress: UserAddress[];

  }
  
  
  
  