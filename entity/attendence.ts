import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable
} from "typeorm";
import User from "./user";
import Subject from "./subject";

@Entity()
export class Attendence {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @ManyToOne(
    type => User,
    User => User.id
  )
  @JoinTable()
  public student: number;

  @Column()
  @ManyToOne(
    type => User,
    User => User.id
  )
  @JoinTable()
  public teacher: number;

  @Column()
  @ManyToOne(
    type => Subject,
    Subject => Subject.id
  )
  @JoinTable()
  public subject: number;

  @Column()
  public attendence: number;
}
export default Attendence;
