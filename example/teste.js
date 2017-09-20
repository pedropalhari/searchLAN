var scanLAN = require('../index.js');

scanLAN('192.168.0.1').then(result => {
    console.log(result);
})

scanLAN('192.168.0.1', 10000, 100, 110).then(result => {
    console.log(result);
})