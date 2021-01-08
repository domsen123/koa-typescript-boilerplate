export interface AppUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at: string;
  updated_at: string;
}

export interface TokenFields {
  id: string;
  email: string;
}
