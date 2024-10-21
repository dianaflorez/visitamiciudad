const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('card_detail', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    card_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'card',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    subtitle: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    longitude: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    latitude: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    schedule: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    prices: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
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
    tableName: 'card_detail',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "card_detail_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
