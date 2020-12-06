import db = require("../connection");
import User from "../entity/user";

const signUp = async payload => {
  let connection = await db.connection;
  const userRepository = connection.getRepository(User);
  await userRepository.save(payload);
  return { message: "user created successfully. Please login" };
};

const login = async payload => {
  let connection = await db.connection;
  const userRepository = connection.getRepository(User);
  let res = await userRepository.findOne(payload);

  if (res) {
    return res;
  } else throw new Error("Invalid credentials");
};

const e = {
  signUp,
  login
};

export default e;
