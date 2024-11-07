import createError from "http-errors";
import User from "../../models/schemas/users-schema";
import { UserAttributes } from "../../models/model-interfaces";
import { ERRORS } from "../../utilities/constants/errors.constant";

const findUserByEmail = async (email: string): Promise<User | null> => {
  return await User.findOne({ where: { email } });
};

const saveUser = async (payload: UserAttributes): Promise<User> => {
  const userExists = await findUserByEmail(payload.email);
  if (userExists) {
    throw new createError.Conflict(ERRORS.emailExists);
  }

  const newUser = User.build(payload);

  newUser.password = await newUser.hashPassword(payload.password);

  const registeredUser = await newUser.save();

  return registeredUser;
};

export const userServices = {
  findUserByEmail,
  saveUser,
};
