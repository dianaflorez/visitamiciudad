const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    identification_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      references: {
        model: 'identification_type',
        key: 'id'
      }
    },
    identification: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: "usuario_username_key"
    },
    email: {
      type: DataTypes.STRING(90),
      allowNull: false,
      unique: "usuario_email_key"
    },
    password: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    auth_key: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    access_token: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'role',
        key: 'id'
      }
    },
    activate: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: true
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
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'usuario',
    schema: 'public',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "usuario_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "usuario_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "usuario_username_key",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};
