import { Model } from 'sequelize';

class Role extends Model {
  // Attributes
  static init(sequelize, DataTypes) {
    return super.init({
      // attributes
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    }, {
      sequelize,
      modelName: 'Role',
    });
  }

  // Methods

  // Associations
  static associate(models) {
    this.myAssociation = this.belongsToMany(models.User, { through: 'UserRole', as: 'users', foreignKey: 'roleId' });
    this.myAssociation = this.belongsToMany(models.Permission, { through: 'RolePermission', as: 'permissions', foreignKey: 'roleId' });
  }
}

export default Role;
