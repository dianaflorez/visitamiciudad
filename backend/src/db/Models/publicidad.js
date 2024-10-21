const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('publicidad', {
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
    orden: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0
    },
    title: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    urlimagen: {
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
    tableName: 'publicidad',
    schema: 'public',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "publicidad_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
