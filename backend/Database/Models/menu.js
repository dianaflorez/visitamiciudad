// Definición del modelo Menu
module.exports = {
    name: 'Menu',
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
            type: 'VARCHAR(33)',
            allowNull: true,
        },
        menu_type_id: {
            type: 'INT',
            allowNull: true,
        },
        parent_id: {
            type: 'INT',
            allowNull: true,
        },
        link: {
            type: 'TEXT,',
            allowNull: true,
        },
        color_primary: {
            type: 'VARCHAR(9),',
            allowNull: true,
        },
        color_secondary: {
            type: 'VARCHAR(9),',
            allowNull: true,
        },
        color_accent: {
            type: 'VARCHAR(9),',
            allowNull: true,
        },
        icon: {
            type: 'TEXT,',
            allowNull: true,
        },
        active: {
            type: 'BOOLEAN',
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
            type: 'INT,',
            allowNull: true,
        },
        FOREIGN: {
            type: 'KEY',
            allowNull: true,
        },
        FOREIGN: {
            type: 'KEY',
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
