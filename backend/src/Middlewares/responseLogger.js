// middleware/responseLogger.js
function responseLogger(req, res, next) {
    // Intercepta la respuesta original
    const oldSend = res.send;
    
    // Redefine el método res.send para registrar la respuesta
    res.send = function (body) {
      console.log('Request URL:', req.originalUrl);
      console.log('Response Status:', res.statusCode);
      console.log('Response Body:', body);
  
      // Llama al método original res.send para enviar la respuesta
      oldSend.apply(res, arguments);
    };
  
    next();
  }
  
  module.exports = responseLogger;
  