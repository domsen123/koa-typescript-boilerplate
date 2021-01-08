import bcrypt from 'bcrypt';
import { DTOSignIn, DTOSignUp } from '../contracts/dto/auth.dto';
import { createUser, findByEmail, findById } from '../data-access/user.db';
import { AppUser } from '../types';
import { createClientToken } from '../utils/jwt';

export const signInService = async (
  dto: DTOSignIn
): Promise<{ user: AppUser; token: string }> => {
  const { email, password } = dto;
  const user = await findByEmail(email);
  if (!user || !user.password)
    throw { status: 404, message: 'User not exists' };

  const match = bcrypt.compareSync(password, user.password);
  if (!match) throw { status: 401, message: 'Wrong password' };

  const token = createClientToken(user);
  delete user.password;

  return {
    user,
    token,
  };
};

export const signUpService = async (
  dto: DTOSignUp
): Promise<{ user: AppUser; token: string }> => {
  const exists = await findByEmail(dto.email);
  if (exists) throw { status: 409, message: 'EMail already exists' };
  const user = await createUser(dto);
  const token = createClientToken(user);
  delete user.password;

  return {
    user,
    token,
  };
};

export const getUserDetailsService = async (id: string): Promise<AppUser> => {
  const user = await findById(id);
  if (!user) throw { status: 404, message: 'Cannot find User.' };
  delete user.password;
  return user;
};
