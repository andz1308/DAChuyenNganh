import { DataTypes, Sequelize } from 'sequelize';
import { getSequelize } from '../config/mysql.js';

const initModels = (sequelize) => {
    const User = sequelize.define('User', {
        fullName: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        phoneNumber: { type: DataTypes.STRING },
        address: { type: DataTypes.STRING },
        role: { type: DataTypes.STRING, allowNull: false },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
        password: { type: DataTypes.STRING, allowNull: false },
    }, { timestamps: true });

    const RefreshToken = sequelize.define('RefreshToken', {
        tokenHash: { type: DataTypes.STRING, allowNull: false, unique: true },
        expiresAt: { type: DataTypes.DATE, allowNull: false },
        createdByIp: { type: DataTypes.STRING },
        revokedAt: { type: DataTypes.DATE },
        revokedByIp: { type: DataTypes.STRING },
        replacedByTokenHash: { type: DataTypes.STRING },
        device: { type: DataTypes.STRING },
    }, { timestamps: true });

    const Otp = sequelize.define('Otp', {
        email: { type: DataTypes.STRING, allowNull: false },
        otp: { type: DataTypes.STRING, allowNull: false },
        expiresAt: { type: DataTypes.DATE, allowNull: false },
    }, { timestamps: false });

    const Database = sequelize.define('Database', {
        name: { type: DataTypes.STRING, allowNull: false },
    }, { timestamps: true });

    // Associations
    User.hasMany(RefreshToken, { foreignKey: 'userId', as: 'refreshTokens' });
    RefreshToken.belongsTo(User, { foreignKey: 'userId', as: 'user' });

    User.hasMany(Database, { foreignKey: 'userId', as: 'databases' });
    Database.belongsTo(User, { foreignKey: 'userId', as: 'user' });

    return { User, RefreshToken, Otp, Database };
};

let models = null;

const getModels = () => {
    if (!models) {
        const sequelize = getSequelize();
        if (!sequelize) throw new Error('Sequelize not initialized');
        models = initModels(sequelize);
    }
    return models;
};

export { initModels, getModels };
