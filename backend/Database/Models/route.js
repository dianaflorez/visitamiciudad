// Definición del modelo Route
module.exports = {
    name: 'Route',
    attributes: {
        (: {
            type: 'undefined',
            allowNull: true,
        },
        id: {
            type: 'INT',
            allowNull: true,
        },
        created_id: {
            type: 'INTEGER,',
            allowNull: true,
        },
        title: {
            type: 'VARCHAR(170)',
            allowNull: true,
        },
        image_url: {
            type: 'VARCHAR(170),',
            allowNull: true,
        },
        person_type_id: {
            type: 'INTEGER,',
            allowNull: true,
        },
        number_people: {
            type: 'INTEGER,',
            allowNull: true,
        },
        number_days: {
            type: 'INTEGER,',
            allowNull: true,
        },
        recommendations: {
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
