// Definición del modelo Card_detail
module.exports = {
    name: 'Card_detail',
    attributes: {
        (: {
            type: 'undefined',
            allowNull: true,
        },
        id: {
            type: 'INT',
            allowNull: true,
        },
        card_id: {
            type: 'INTEGER,',
            allowNull: true,
        },
        title: {
            type: 'VARCHAR(70),',
            allowNull: true,
        },
        image_url: {
            type: 'VARCHAR(250),',
            allowNull: true,
        },
        subtitle: {
            type: 'TEXT,',
            allowNull: true,
        },
        location: {
            type: 'TEXT,',
            allowNull: true,
        },
        longitude: {
            type: 'VARCHAR(24),',
            allowNull: true,
        },
        latitude: {
            type: 'VARCHAR(24),',
            allowNull: true,
        },
        phone: {
            type: 'VARCHAR(24),',
            allowNull: true,
        },
        schedule: {
            type: 'TEXT,',
            allowNull: true,
        },
        prices: {
            type: 'TEXT,',
            allowNull: true,
        },
        description: {
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
