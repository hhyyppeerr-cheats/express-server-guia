const helmet = require('helmet');

const helmetConfig = helmet({
  contentSecurityPolicy: false, // o tu configuración personalizada
    frameguard: {
        action: 'deny'
    },
    referrerPolicy: {
        policy: 'same-origin'
    },
    hidePoweredBy: true
});

module.exports = helmetConfig;
