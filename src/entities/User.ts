import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  OneToMany,
  //   OneToMany,
} from 'typeorm';
import { CompanyUser } from './CompanyUser';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
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
  @CreateDateColumn()
  createAt!: number;
  @UpdateDateColumn()
  updateAt!: number;
}
