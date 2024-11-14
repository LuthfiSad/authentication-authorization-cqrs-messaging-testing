import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'cqrs-testing',
  user: 'postgres',
  password: 'admin123'
});

export default db;
