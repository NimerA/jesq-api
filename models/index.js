import User from './user';
import Role from './role';
import Permission from './permission';

const Sequelize = require('sequelize');
const envConfigs = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];

const sequelize = new Sequelize(config.url, config);

const models = {
  User: User.init(sequelize, Sequelize),
  Role: Role.init(sequelize, Sequelize),
  Permission: Permission.init(sequelize, Sequelize),
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

const db = {
  ...models,
  sequelize,
};

export default db;
