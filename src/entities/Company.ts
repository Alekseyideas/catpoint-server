import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { CompanyUser } from './CompanyUser';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column('varchar', { unique: true, length: 255 })
  email!: string;
  @Column('varchar', { unique: true, length: 255 })
  firstName!: string;
  @Column('varchar', { unique: true, length: 255 })
  position!: string;
  @Column('varchar', { length: 255 })
  address!: string;
  @Column({ nullable: true })
  image!: string;
  @Column('varchar', { length: 255 })
  name!: string;
  @Column('varchar', { length: 15 })
  phone!: string;
  @Column({ select: false })
  password!: string;
  @Column('bool', {
    default: false,
  })
  isActive!: boolean;

  @OneToMany(() => CompanyUser, (cu) => cu.company)
  users: Promise<CompanyUser[]>;

  @CreateDateColumn()
  createAt!: number;
  @UpdateDateColumn()
  updateAt!: number;
}
