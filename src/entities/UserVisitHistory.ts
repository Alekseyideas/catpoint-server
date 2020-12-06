import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import Model from './Model';
import { User, Company } from '.';

@Entity('users_visits_history')
export class UserVisitHistory extends Model {
  @Column()
  userId: number;
  @Column()
  companyId: number;

  @Column()
  points: number;

  @ManyToOne(() => User, (user) => user.history, { primary: true })
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;

  @ManyToOne(() => Company, (company) => company.history, { primary: true })
  @JoinColumn({ name: 'companyId' })
  company: Promise<Company>;
}
