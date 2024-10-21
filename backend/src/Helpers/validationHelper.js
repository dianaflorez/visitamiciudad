//========================================
// Este archivo crea funciónes para ayudar en la validación de creación y update de las rutas POST.
// IMPORTA:
//      'db': La configuración de la base de datos desde './src/db/db.config'.
//      'preseleccion' : Función para evaluar la preselección en caso de creación de un Becario.
// EXPORTA: Las funciones de validación
//========================================
const { db } = require('../db/db.config');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
const sanitizeHtml = require('sanitize-html');

// Lista de campos a excluir por modelo y generales, y campos con valores predeterminados
const FIELD_RULES = {
    General: {
        InsertUserId: 'exclude',
        UpdateUserId: 'exclude',
        createdAt: 'exclude',
        updatedAt: 'exclude',
        Id:'exclude'
    },
    Becario: {
        EstatusEntrevista: 1,
        EstatusPreseleccion: 'exclude',
        EstatusNotificacionEntrevista: 0,
        EstatusNotificacionResultadoEntrevista: 0,
        IsActive: 0,
        EstadoActualBecarioId : 2
    }
};

// Función para obtener el valor convertido a su tipo correcto según el tipo del modelo para su posterior ingreso a al base de datos
const convertionFunction = (value, type) => {
    try {
        if (value === null || value === undefined) return null;
        switch (type) {
            case 'STRING':
            case 'TEXT':
            case 'ENUM':
                const sanitizedValue = sanitizeHtml(value);
                return sanitizedValue.trim() === '' ? null : sanitizedValue;
            case 'INTEGER':
            case 'BIGINT':
            case 'SMALLINT':
                return isNaN(parseInt(value, 10)) ? null : parseInt(value, 10);
            case 'FLOAT':
            case 'DOUBLE':
            case 'DECIMAL':
                return isNaN(parseFloat(value)) ? null : parseFloat(value);
            case 'BOOLEAN':
                return Boolean(value);
            case 'DATE':
                const dateFormatted = dayjs(value).utc().subtract(5, 'hours').format('YYYY-MM-DD HH:mm:ss');
                return isNaN(Date.parse(value)) ? null : dateFormatted ;
            case 'DATEONLY':
                return isNaN(Date.parse(value)) ? null : dayjs(value).format('YYYY-MM-DD');
            default:
                return value;
        }
    } catch (error) {
        throw new Error(`Error en la conversión del tipo de dato para el valor: ${value}, tipo: ${type}`);
    }
};

//Funcion para validar los campos de la data que llega a los Handlers por la ruta POST y retornarlos normalizados y separados entre campos normales y foreingkeys
const postValidation = async (modelName, newData) => {
    if (!newData) return { error: `No se enviaron los datos para la creación` };

    if(modelName === 'ModeloBeneficioEconomicoPeriodico'){
        if (typeof newData.Opcional === 'undefined') {
            newData.Opcional = false;
        }
        if (typeof newData.Variable === 'undefined') {
            newData.Variable = false;
        }
    }

    // Cargar los atributos del modelo
    const attributes = db.models[modelName].getAttributes();
    const fieldRules = { ...FIELD_RULES.General, ...FIELD_RULES[modelName] };

    // Variables normales
    const data = { regularFields: {}, foreignKeys: {} };
    const validationErrors = [];

    // Validación de NotNulls y length + transformación en los types correctos para garantizar la integridad de la base de datos
    for (const field of Object.keys(attributes)) {
        // Ignorar campos en fieldRules durante la validación inicial
        if (fieldRules[field]!==undefined) continue;

        const { type, primaryKey, allowNull, autoIncrement, references } = attributes[field];
        let fieldLength = type?.options?.length ? parseInt(type.options.length) : "";
        let foreignKeyInfo = references ? references : "";

        try {
            const convertedValue = convertionFunction(newData[field], type.key);

            if (!primaryKey && !autoIncrement) {
                if (convertedValue !== null) {
                    // Validar longitud si el campo existe en newData
                    if (fieldLength && newData[field]?.length > fieldLength) 
                        validationErrors.push(`Se excedió el máximo número de caracteres (${fieldLength}) de ${field}`);

                    if (['CorreoElectronico', 'CorreoInstitucional'].includes(field)) {
                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newData[field]))
                            validationErrors.push(`El campo ${field} debe ser un correo electrónico válido`);
                    }

                    if (foreignKeyInfo) 
                        data.foreignKeys[field] = convertedValue;
                    else 
                        data.regularFields[field] = convertedValue;
                } else {
                    // Verificar si el campo permite valores nulos
                    if ( !allowNull ) validationErrors.push(`El campo ${field} no acepta valores nulos`);
                    
                    data.regularFields[field] = newData[field]
                }
            }
        } catch (conversionError) {
            validationErrors.push(`Error en la conversión del tipo de dato en el campo ${field}: ${conversionError.message}`);
        }
    }

    // Asignar valores predeterminados después de la validación inicial
    for (const [field, rule] of Object.entries(fieldRules)) {
        if (rule !== 'exclude') {
            if (attributes[field]?.references) {
                data.foreignKeys[field] = rule;
            } else {
                data.regularFields[field] = rule;
            }
        }
    }

    if (validationErrors.length > 0) return { error: validationErrors.join(', ') };
    if (modelName === 'Becario') await preseleccion(data);;

    return data;
}

// Función para validar los campos de la data que llega a los Handlers por la ruta PUT y retornarlos separados entre campos normales y foreignKeys
const putValidation = (modelName, newData) => {
    // Cargar los atributos del modelo
    const attributes = db.models[modelName].getAttributes();

    // Variables normales
    const data = { regularFields: {}, foreignKeys: {} };

    // Validación de NotNulls y length + transformación en los types correctos para garantizar la integridad de la base de datos
    Object.keys(newData).forEach(field => {
        if (attributes.hasOwnProperty(field) && field !== "updatedAt" && field !== "createdAt" ) {
            const { type, primaryKey, allowNull, autoIncrement, references } = attributes[field];
            let fieldLength = type?.options?.length ? parseInt(type.options.length) : "";
            let foreignKeyInfo = references ? references : "";

            if (!primaryKey  && !autoIncrement) {
                if(newData[field] !== null && newData[field] !== undefined && newData[field] !== ''){
                    try {
                        // Convertir el valor según el tipo de su campo en el modelo
                        const convertedValue = convertionFunction(newData[field], type.key);

                        // Validar longitud si el campo existe en newData
                        if (fieldLength && convertedValue.length > fieldLength) 
                            return { error: `Se excedió el máximo número de caracteres (${fieldLength}) de ${field}` };
                        
                        if (foreignKeyInfo)
                            data.foreignKeys[field] = convertedValue;
                        else
                            data.regularFields[field] = convertedValue;
                    } catch (conversionError) {
                        return { error: `Error en la conversión del tipo de dato en el campo ${field}: ${conversionError.message}` };
                    }
                } else{
                    // Verificar si el campo permite valores nulos
                    if ( !allowNull ) return { error: `El campo ${field} no acepta valores nulos` };
                    data.regularFields[field] = null
                } 
            }
        }
    });

    return data;
};

const passwordValidation = (password) => {
    const result = {
        isValid: true,
        message: ''
    };

    if (password.length < 5) {
        result.isValid = false;
        result.message = 'La contraseña debe tener al menos 5 caracteres.';
    }
    // } else if (!/[A-Z]/.test(password)) {
    //     result.isValid = false;
    //     result.message = 'La contraseña debe contener al menos una letra mayúscula.';
    // } else if (!/[a-z]/.test(password)) {
    //     result.isValid = false;
    //     result.message = 'La contraseña debe contener al menos una letra minúscula.';
    // } else if (!/[0-9]/.test(password)) {
    //     result.isValid = false;
    //     result.message = 'La contraseña debe contener al menos un número.';
    // } else if (!/[!@#$%^&*.,]/.test(password)) {
    //     result.isValid = false;
    //     result.message = 'La contraseña debe contener al menos un carácter especial (!@#$%^&*).';
    // }

    return result;
};


module.exports = { postValidation, putValidation, passwordValidation }