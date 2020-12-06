import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from './Company';
import Model from './Model';
import { User } from './User';

@Entity('companies_users')
export class CompanyUser extends Model {
  @Column()
  userId: number;

  @Column()
  companyId: number;

  @Column({ default: 0 })
  visits: number;

  @Column()
  points: number;

  @Column({ default: 0 })
  finishedCount: number;

  @ManyToOne(() => User, (user) => user.companies, { primary: true })
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;

  @ManyToOne(() => Company, (company) => company.users, { primary: true })
  @JoinColumn({ name: 'companyId' })
  company: Promise<Company>;
}
