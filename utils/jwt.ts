import jwt from 'jsonwebtoken';
import { AppUser, TokenFields } from '../types';

const getTokenSecret = (): string => {
  return process.env.TOKEN_SECRET ?? 'pssssht_its_development';
};

export const createClientToken = (user: AppUser): string => {
  const { id, email } = user;
  return jwt.sign({ id, email }, getTokenSecret());
};

export const decodeClientToken = (token: string): TokenFields => {
  const _r = jwt.verify(token, getTokenSecret()) as TokenFields;
  if (!_r.id || !_r.email) {
    throw { status: 500, message: 'Cannot decode token.' };
  }
  return _r;
};
