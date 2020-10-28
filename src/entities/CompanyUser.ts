import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from './Company';
import { User } from './User';

@Entity()
export class CompanyUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;
  @PrimaryGeneratedColumn()
  companyId: number;

  @Column()
  points: number;

  @ManyToOne(() => User, (user) => user.companyConnection, { primary: true })
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;

  @ManyToOne(() => Company, (company) => company.userConnection, { primary: true })
  @JoinColumn({ name: 'companyId' })
  company: Promise<Company>;

  @CreateDateColumn()
  createAt: number;
  @UpdateDateColumn()
  updateAt: number;
}
