// Definición del modelo Country(
module.exports = {
    name: 'Country(',
    attributes: {
        cod_country: {
            type: 'char(3)',
            allowNull: true,
        },
        nombre: {
            type: 'varchar(50),',
            allowNull: true,
        },
        active: {
            type: 'boolean',
            allowNull: true,
        },
        ): {
            type: 'undefined',
            allowNull: true,
        },
    },
    options: {
        timestamps: true,
    },
};
