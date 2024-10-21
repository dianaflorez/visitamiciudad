const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('card', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'menu',
        key: 'id'
      }
    },
    created_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'id'
      }
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'city',
        key: 'id'
      }
    },
    order_no: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0
    },
    title: {
      type: DataTypes.STRING(170),
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING(170),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    home: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "Vertical"
    },
    card_group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'card_group',
        key: 'id'
      }
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
    tableName: 'card',
    schema: 'public',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "card_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
