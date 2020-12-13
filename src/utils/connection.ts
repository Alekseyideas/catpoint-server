import { createConnection } from 'typeorm';
import path from 'path';
import * as Entities from '../entities';
// import { DB_URL } from './const';

export const connectToDb = async () => {
  try {
    const { User, Company, CompanyUser, UserVisitHistory } = Entities;
    await createConnection({
      type: 'postgres',
      // url: DB_URL,
      migrations: [path.join(__dirname, './migrations/*')],
      entities: [User, Company, CompanyUser, UserVisitHistory],
    });
    console.log('✅ Database was connected');
  } catch (e) {
    console.log('❌ connectToDb -> e', e);
  }
};
