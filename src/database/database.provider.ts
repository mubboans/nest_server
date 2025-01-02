
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/users/entities/user.entity';

console.log('Database Config:', {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export const databaseProviders = [
  {
    provide: process.env.SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: process.env.DB_DIALECT as 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });
      sequelize.addModels([User]);
      try {
        sequelize.authenticate();
      } catch (error) {
        throw error;
      }
      await sequelize.sync({ alter: false });

      return sequelize;
    },
  },
];

export const sequelizeModuleProvider = {
  dialect: process.env.DB_DIALECT as 'mysql' || 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  models: [User],
  synchronize: true,
}
