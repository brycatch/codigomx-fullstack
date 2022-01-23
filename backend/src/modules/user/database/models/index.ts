import { DataTypes } from 'sequelize';
import { DB } from '..';

const User = DB.instance.sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'first_name',
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'last_name',
  },
  password: {
    type: DataTypes.STRING(2000),
    allowNull: false,
    field: 'password',
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'birthday',
  },
  gender: {
    type: DataTypes.TINYINT,
    allowNull: false,
    field: 'gender_id',
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active',
  },
});

export { User };
