const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('card_detail_image', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    card_detail_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'card_detail',
        key: 'id'
      }
    },
    order_no: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING(170),
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
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
    tableName: 'card_detail_image',
    schema: 'public',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "card_detail_image_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
