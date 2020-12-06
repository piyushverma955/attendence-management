import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable
} from "typeorm";
import User from "./user";
@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public name: string;
  @Column()
  public code: string;
  @Column()
  @ManyToOne(
    type => User,
    User => User.id
  )
  public taughtBy: number;
}
export default Subject;
