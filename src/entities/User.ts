import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  //   OneToMany,
} from "typeorm";

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
  @CreateDateColumn()
  createAt!: number;
  @UpdateDateColumn()
  updateAt!: number;
}
