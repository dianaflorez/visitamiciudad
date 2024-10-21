// Definición del modelo Departamento(
module.exports = {
    name: 'Departamento(',
    attributes: {
        cod_dep: {
            type: 'char(3),',
            allowNull: true,
        },
        cod_country: {
            type: 'char(3),',
            allowNull: true,
        },
        nombre: {
            type: 'varchar(50)',
            allowNull: true,
        },
        ): {
            type: 'undefined',
            allowNull: true,
        },
    },
    options: {
        timestamps: true,
    underscored: true,
    },
};
