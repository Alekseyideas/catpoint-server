import { Entity, Column, OneToMany } from 'typeorm';
import { Length, IsEmail } from 'class-validator';
import { CompanyUser } from './CompanyUser';
import Model from './Model';

@Entity('companies')
export class Company extends Model {
  @Column('varchar', { unique: true, length: 255 })
  @IsEmail()
  email!: string;
  @Column('varchar', { length: 255 })
  @Length(2)
  firstName!: string;
  @Column('varchar', { length: 255 })
  @Length(2)
  position!: string;
  @Column('varchar', { length: 255 })
  @Length(5)
  address!: string;
  @Column({ nullable: true })
  image!: string;
  @Column('varchar', { length: 255 })
  @Length(2)
  name!: string;
  @Column('varchar', { length: 15 })
  @Length(10, 15)
  phone!: string;
  @Column({ select: false })
  @Length(5)
  password!: string;

  @Column({ default: 5 })
  totalPoints: number;

  @Column('bool', {
    default: false,
  })
  isActive!: boolean;

  @OneToMany(() => CompanyUser, (cu) => cu.company, { cascade: true })
  users: Promise<CompanyUser[]>;

  Json() {
    return {
      ...this,
      password: undefined,
    };
  }
}
