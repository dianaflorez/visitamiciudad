// Definición del modelo City(
module.exports = {
    name: 'City(',
    attributes: {
        id: {
            type: 'int(11)',
            allowNull: true,
        },
        cod_country: {
            type: 'char(3),',
            allowNull: true,
        },
        cod_dep: {
            type: 'char(3),',
            allowNull: true,
        },
        cod_city: {
            type: 'char(3),',
            allowNull: true,
        },
        nombre: {
            type: 'varchar(50),',
            allowNull: true,
        },
        INDEX: {
            type: 'city',
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
