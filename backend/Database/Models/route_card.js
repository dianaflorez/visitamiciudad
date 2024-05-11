// Definición del modelo Route_card
module.exports = {
    name: 'Route_card',
    attributes: {
        (: {
            type: 'undefined',
            allowNull: true,
        },
        id: {
            type: 'INT',
            allowNull: true,
        },
        route_id: {
            type: 'INTEGER,',
            allowNull: true,
        },
        card_id: {
            type: 'INTEGER,',
            allowNull: true,
        },
        day_number: {
            type: 'SMALLINT',
            allowNull: true,
        },
        orden: {
            type: 'INTEGER,',
            allowNull: true,
        },
        recommendations: {
            type: 'TEXT,',
            allowNull: true,
        },
        start_time: {
            type: 'TIME,',
            allowNull: true,
        },
        end_time: {
            type: 'TIME,',
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
        ): {
            type: 'undefined',
            allowNull: true,
        },
    },
    options: {
        timestamps: true,
    },
};
