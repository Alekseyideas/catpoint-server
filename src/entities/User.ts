import {
  Entity,
  Column,
  OneToMany,
  //   OneToMany,
} from 'typeorm';
import { CompanyUser } from './CompanyUser';
import Model from './Model';

@Entity('users')
export class User extends Model {
  @Column({ unique: true })
  appId!: string;
  @Column({ unique: true })
  email!: string;
  @Column({ nullable: true })
  image!: string;
  @Column()
  lastName!: string;
  @Column()
  firstName!: string;
  @OneToMany(() => CompanyUser, (cu) => cu.user)
  companies: Promise<CompanyUser[]>;
}
