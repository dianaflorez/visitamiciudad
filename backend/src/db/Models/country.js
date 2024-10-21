const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('country', {
    cod_country: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'country',
    schema: 'public',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        name: "country_pkey",
        unique: true,
        fields: [
          { name: "cod_country" },
        ]
      },
    ]
  });
};
