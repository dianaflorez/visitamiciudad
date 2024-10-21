const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menu', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(33),
      allowNull: false
    },
    menu_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      references: {
        model: 'menu_type',
        key: 'id'
      }
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    color_primary: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    color_secondary: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    color_accent: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    icon: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'menu',
    schema: 'public',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        name: "menu_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
