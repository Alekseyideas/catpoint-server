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
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ unique: true })
  email!: string;
  @Column({ nullable: true })
  image!: string;
  @Column()
  name!: string;
  @Column({
    default: false,
  })
  isActive!: boolean;
  @CreateDateColumn()
  createAt!: number;
  @UpdateDateColumn()
  updateAt!: number;
}
