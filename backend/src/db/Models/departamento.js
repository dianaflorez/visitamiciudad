const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('departamento', {
    cod_dep: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      primaryKey: true
    },
    cod_country: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'country',
        key: 'cod_country'
      }
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'departamento',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "departamento_pkey",
        unique: true,
        fields: [
          { name: "cod_dep" },
          { name: "cod_country" },
        ]
      },
    ]
  });
};
