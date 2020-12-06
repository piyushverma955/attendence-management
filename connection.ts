import { createConnection } from "typeorm";
import User from "./entity/user";
import Subject from "./entity/subject";
import Attendence from "./entity/attendence";

export const connection = createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "demo",
  entities: [User, Subject, Attendence],
  synchronize: true,
  logging: false
});
