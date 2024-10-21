const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('route', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    created_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(170),
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING(170),
      allowNull: true
    },
    person_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'person_type',
        key: 'id'
      }
    },
    number_people: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    number_days: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    recommendations: {
      type: DataTypes.TEXT,
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
    tableName: 'route',
    schema: 'public',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "route_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
