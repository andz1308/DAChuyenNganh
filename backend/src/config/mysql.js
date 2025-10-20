// src/config/mysql.js
import { Sequelize } from 'sequelize';
import { env } from './environment.js';

let sequelize;

export const connectToMysql = async () => {
  try {
    sequelize = new Sequelize(env.DB_NAME || '', env.DB_USER || '', env.DB_PASS || '', {
      host: env.DB_HOST || '127.0.0.1',
      port: env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: false,
    });

    await sequelize.authenticate();
    console.log('✅ Connected to MySQL successfully');
    return sequelize; // 🔹 Thêm dòng này
  } catch (error) {
    console.error('❌ MySQL connection error:', error.message);
    throw error;
  }
};

export const getSequelize = () => sequelize;
