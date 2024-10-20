const responseF = ({ status, success, message = null, data = null }) => {
    return {
        status,
        response: {
            success,
            message,
            data
        }
    };
};

module.exports = { responseF };