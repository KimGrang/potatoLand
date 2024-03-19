import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Index('email', ['email'], {unique : true})
@Entity({name : 'users'})
export class User {

  @PrimaryGeneratedColumn()
  id : number;

  @Column({type : 'varchar', unique : true, nullable : false})
  email : string;

  @Column({type : 'varchar', select : true, nullable : false})
  password : string

  @Column({type : 'varchar', nullable : false})
  name : string;

  @Column({type : 'varchar'})
  image : string
  
  @CreateDateColumn()
  created_at : Date;

  @UpdateDateColumn()
  updated_at : Date;

  @Column({type : 'varchar', nullable : false})
  emailYn : string;

  @Column({type : 'varchar', nullable : false})
  emailYnCode : string;
}