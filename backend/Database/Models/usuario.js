// Definición del modelo Usuario
module.exports = {
    name: 'Usuario',
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
            type: 'VARCHAR(70)',
            allowNull: true,
        },
        last_name: {
            type: 'VARCHAR(70),',
            allowNull: true,
        },
        identification_type_id: {
            type: 'INT',
            allowNull: true,
        },
        identification: {
            type: 'VARCHAR(30),',
            allowNull: true,
        },
        username: {
            type: 'VARCHAR(250)',
            allowNull: true,
        },
        email: {
            type: 'VARCHAR(90)',
            allowNull: true,
        },
        password: {
            type: 'VARCHAR(40),',
            allowNull: true,
        },
        auth_key: {
            type: 'VARCHAR(40),',
            allowNull: true,
        },
        role_id: {
            type: 'INT,',
            allowNull: true,
        },
        activate: {
            type: 'SMALLINT',
            allowNull: true,
        },
        state: {
            type: 'BOOLEAN,',
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
