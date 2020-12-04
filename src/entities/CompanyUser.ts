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

// console.log();
@Entity()
export class CompanyUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;

  @Column()
  companyId: number;

  @Column()
  points: number;

  @ManyToOne(() => User, (user) => user.companies, { primary: true })
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;

  @ManyToOne(() => Company, (company) => company.users, { primary: true })
  @JoinColumn({ name: 'companyId' })
  company: Promise<Company>;

  @CreateDateColumn()
  createAt: number;
  @UpdateDateColumn()
  updateAt: number;
}
