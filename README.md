# searchLAN

Node.js package that searchs the LAN for IP addresses.

### Installing

```
npm install searchlan --save
```

### Example

It can be found in the /example folder.

```javascript
var scanLAN = require('../index.js');

scanLAN('192.168.0.1').then(result => {
    console.log(result); //['192.168.0.1, '192.168.0.2', ..., '192.168.0.254']
})

scanLAN('192.168.0.1', 10000, 100, 110).then(result => {
    console.log(result); ['192.168.0.1, '192.168.0.100', ..., '192.168.0.109'] with a 10 second timeout
})
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
