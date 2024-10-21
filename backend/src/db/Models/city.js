const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('city', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cod_country: {
      type: DataTypes.CHAR(3),
      allowNull: true,
      references: {
        model: 'departamento',
        key: 'cod_dep'
      },
      unique: "city_cod_country_cod_dep_cod_city_key"
    },
    cod_dep: {
      type: DataTypes.CHAR(3),
      allowNull: true,
      references: {
        model: 'departamento',
        key: 'cod_dep'
      },
      unique: "city_cod_country_cod_dep_cod_city_key"
    },
    cod_city: {
      type: DataTypes.CHAR(3),
      allowNull: true,
      unique: "city_cod_country_cod_dep_cod_city_key"
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'city',
    schema: 'public',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        name: "city_cod_country_cod_dep_cod_city_key",
        unique: true,
        fields: [
          { name: "cod_country" },
          { name: "cod_dep" },
          { name: "cod_city" },
        ]
      },
      {
        name: "city_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
