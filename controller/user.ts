import User from "../entity/user";
import userSerice from "../service/user";

const signUp = async payload => {
  const { name, email, password, type } = payload;
  let user = new User();
  user.name = name;
  user.email = email;
  user.password = password;
  user.type = type;
  return await userSerice.signUp(user);
};

const login = async payload => {
  return await userSerice.login(payload);
};

const e = {
  signUp,
  login
};

export default e;
