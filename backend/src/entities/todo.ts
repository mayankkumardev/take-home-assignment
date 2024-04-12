import {
  Entity,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user';

export const TODO = 'To Do';
export const INPROGRESS = 'In Progress';
export const DONE = 'Done';

export enum TodoStatus {
  TODO = 'To Do',
  INPROGRESS = 'In Progress',
  DONE = 'Done',
}

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.todos, { nullable: false }) created_by: User;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.TODO,
  })
  status: TodoStatus;

  @Column({ nullable: false, type: 'varchar' })
  title: string;

  @Column({ nullable: false, type: 'varchar' })
  description: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;
}
