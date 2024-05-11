// Definición del modelo Role
module.exports = {
    name: 'Role',
    attributes: {
        (: {
            type: 'undefined',
            allowNull: true,
        },
        id: {
            type: 'INT',
            allowNull: true,
        },
        name: {
            type: 'VARCHAR(30)',
            allowNull: true,
        },
        created_at: {
            type: 'TIMESTAMP',
            allowNull: true,
        },
        updated_at: {
            type: 'TIMESTAMP',
            allowNull: true,
        },
        updated_by: {
            type: 'INT',
            allowNull: true,
        },
        ): {
            type: 'undefined',
            allowNull: true,
        },
        ENGINE=InnoDB;: {
            type: 'undefined',
            allowNull: true,
        },
        undefined: {
            type: 'undefined',
            allowNull: true,
        },
    },
    options: {
        timestamps: true,
    },
};
