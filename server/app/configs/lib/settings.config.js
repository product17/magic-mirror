export const settings = {
  development: {
    app: 'Base Node App',
    db_path: 'mongodb://localhost:27017',
    base_path: 'server',
    port: 3000,
    logging: {
      info: process.stdout,
      error: 'logs/error.log',
    },
  },
  staging: {
    app: 'Staging Node App',
    db_path: 'mongodb://localhost:27017',
    base_path: 'build',
    port: 3000,
    logging: {
      info: process.stdout,
      error: 'logs/error.log',
    },
  },
  production: {
    app: 'Production Node App',
    db_path: 'mongodb://localhost:27017',
    base_path: 'build',
    port: 3000,
    logging: {
      info: process.stdout,
      error: 'logs/error.log',
    },
  },
};
