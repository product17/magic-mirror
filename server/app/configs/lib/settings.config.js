export default {
  development: {
    app: 'Base Node App',
    db_path: 'mongodb://localhost:27017',
    base_path: 'server',
    port: 3000,
  },
  staging: {
    app: 'Staging Node App',
    db_path: 'mongodb://localhost:27017',
    base_path: 'build',
    port: 3000,
  },
  production: {
    app: 'Production Node App',
    db_path: 'mongodb://localhost:27017',
    base_path: 'build',
    port: 3000,
  },
};
