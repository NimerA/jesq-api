import { Model } from 'sequelize';

class User extends Model {
  // Attributes
  static init(sequelize, DataTypes) {
    return super.init({
      // attributes
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    }, {
      sequelize,
      modelName: 'User',
    });
  }

  // Methods
  static findByUsername(username) {
    return this.findOne({ where: { username } });
  }

  static findById(id) {
    return this.findOne({ where: { id } });
  }
}

export default User;
