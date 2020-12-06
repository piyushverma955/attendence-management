import { createConnection } from "typeorm";
import User from "./entity/user";
import Subject from "./entity/subject";
import Attendence from "./entity/attendence";
import config = require("./config");
const mysql = config.mysql;

export const connection = createConnection({
  type: "mysql",
  host: mysql.host,
  port: mysql.port,
  username: mysql.username,
  password: mysql.password,
  database: mysql.database,
  entities: [User, Subject, Attendence],
  synchronize: true,
  logging: false
});
