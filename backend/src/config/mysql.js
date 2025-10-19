import { Sequelize } from 'sequelize';
import { env } from './environment.js';

let sequelize;

const connectToMysql = async () => {
    try {
        sequelize = new Sequelize(env.DB_NAME || '', env.DB_USER || '', env.DB_PASS || '', {
            host: env.DB_HOST || '127.0.0.1',
            port: env.DB_PORT || 3306,
            dialect: 'mysql',
            logging: false,
        });

        await sequelize.authenticate();
        console.log('✅ Connected to MySQL successfully');
    } catch (error) {
        console.error('❌ MySQL connection error:', error.message);
    }
};

const getSequelize = () => sequelize;

export { connectToMysql, getSequelize };
