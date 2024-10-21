const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('card_group', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING(170),
      allowNull: true
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
    tableName: 'card_group',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "card_group_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
