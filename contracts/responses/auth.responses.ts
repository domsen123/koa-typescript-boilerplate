import { AppUser } from '../../types';

export interface SignInResponse {
  user: AppUser;
  token: string;
}

export interface SignUpResponse {
  user: AppUser;
  token: string;
}

export interface UserDetailsResponse {
  user: AppUser;
}
