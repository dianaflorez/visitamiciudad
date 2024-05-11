// Definición del modelo Card
module.exports = {
    name: 'Card',
    attributes: {
        (: {
            type: 'undefined',
            allowNull: true,
        },
        id: {
            type: 'INT',
            allowNull: true,
        },
        menu_id: {
            type: 'INTEGER,',
            allowNull: true,
        },
        created_id: {
            type: 'INTEGER,',
            allowNull: true,
        },
        city_id: {
            type: 'INTEGER,',
            allowNull: true,
        },
        order_no: {
            type: 'SMALLINT',
            allowNull: true,
        },
        title: {
            type: 'VARCHAR(70),',
            allowNull: true,
        },
        image_url: {
            type: 'VARCHAR(170),',
            allowNull: true,
        },
        description: {
            type: 'TEXT,',
            allowNull: true,
        },
        home: {
            type: 'BOOLEAN',
            allowNull: true,
        },
        type: {
            type: 'VARCHAR(10)',
            allowNull: true,
        },
        card_group_id: {
            type: 'INTEGER,',
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
        FOREIGN: {
            type: 'KEY',
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
