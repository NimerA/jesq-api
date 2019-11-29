import { Model } from 'sequelize';

class User extends Model {
  // Attributes
  static init(sequelize, DataTypes) {
    return super.init({
      // attributes
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
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

  // Role Methods
  // getRole, setRole, createRole

  /**
   * gets the user that matches username
   * @param {string} username
   */
  static findByUsername(username) {
    return this.findOne({ where: { username } });
  }

  /**
   * gets the user with the provided id
   * @param {number} id
   */
  static findById(id) {
    return this.findOne({ where: { id } });
  }

  // TODO
  // Get all related roles
  // Get all permitions
  // return boolean indicating if user has a permition
  /*
  static hasPermission(type) {

  }
  */

  // Associations
  static associate(models) {
    this.myAssociation = this.hasOne(models.User, { as: 'creator', foreignKey: 'createdBy' });
    this.myAssociation = this.hasOne(models.User, { as: 'modifier', foreignKey: 'modifiedBy' });
    this.myAssociation = this.belongsTo(models.Role, { as: 'role' });
  }
}

export default User;
