import { Model } from 'sequelize';

class Permission extends Model {
  // Attributes
  static init(sequelize, DataTypes) {
    return super.init({
      // attributes
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    }, {
      sequelize,
      modelName: 'Permission',
    });
  }

  // Methods

  // Associations
  static associate(models) {
    this.myAssociation = this.belongsToMany(models.Role, { through: 'RolePermission', as: 'roles', foreignKey: 'permissionId' });
  }
}

export default Permission;
