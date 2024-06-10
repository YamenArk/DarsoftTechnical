import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from './user';

@Entity({ name: 'countries' })
export class Countrie {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    countrieId: number;

    @Column({ nullable: false })
    @IsNotEmpty()
    @IsString()
    name: string;

 
    @OneToMany(() => User, (user) => user.countrie)
    user: User[] 

}