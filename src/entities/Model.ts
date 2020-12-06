import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export default abstract class Model extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @CreateDateColumn()
  createAt!: number;
  @UpdateDateColumn()
  updateAt!: number;
}
