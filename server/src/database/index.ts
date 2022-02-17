import { Sequelize } from 'sequelize';

function sequelize() {
  const {
    DATABASE_URL: url,
    DATABASE_HOST: host,
    DATABASE_NAME: database,
    DATABASE_USERNAME: username,
    DATABASE_PASSWORD: password,
  } = process.env;

  if (url) {
    return new Sequelize(url);
  }

  const dialect = 'postgres';
  return new Sequelize({
    host,
    database,
    username,
    password,
    dialect,
  });
}

export default new Promise<Sequelize>((resolve, reject) => {
  try {
    const database = sequelize();
    database.authenticate().then(() => {
      resolve(database);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    reject(error);
  }
});
