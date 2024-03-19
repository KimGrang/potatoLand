import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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
  imdage : string
  
  @Column({type : 'date', default : () => 'CURRENT_TIMESTAMP'})
  created_at : Date;

  @Column({type : 'date', default : () => 'CURRENT_TIMESTAMP'})
  updated_at : Date;

  @Column({type : 'varchar', nullable : false})
  emailYn : string;

  @Column({type : 'varchar', nullable : false})
  emailYnCode : string;
}