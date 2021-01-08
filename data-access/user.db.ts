import bcrypt from 'bcrypt';
import { DTOSignUp } from '../contracts/dto/auth.dto';
import { getDatabase } from '../db';
import { AppUser } from '../types';

export const migrate = async (drop?: boolean) => {
  const db = await getDatabase();
  const exists = db.schema.hasTable('users');
  if (exists && !drop) return;
  await db.schema.dropTableIfExists('users');
  await db.schema.createTable('users', (table) => {
    table.increments().primary().unsigned();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();

    table.timestamps();
  });
  await createUser({
    name: 'Root',
    email: 'root@local.dev',
    password: 'pass@word',
  });
};

export const findByEmail = async (email: string): Promise<AppUser> => {
  const db = await getDatabase();
  return await db('users').where({ email }).first();
};

export const findById = async (id: string): Promise<AppUser> => {
  const db = await getDatabase();
  return await db('users').where({ id }).first();
};

export const createUser = async (dto: DTOSignUp): Promise<AppUser> => {
  const db = await getDatabase();
  const insert = {
    name: dto.name,
    email: dto.email,
    password: bcrypt.hashSync(dto.password, 10),
    created_at: new Date(),
    updated_at: new Date(),
  };
  await db('users').insert(insert).returning('*');
  return findByEmail(dto.email);
};
