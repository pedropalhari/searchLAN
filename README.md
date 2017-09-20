# searchLAN

Node.js package that searchs the LAN for IP addresses.

### Installing

```
npm install searchlan --save
```

### Example

It can be found in the /example folder.

```
var scanLAN = require('../index.js');

scanLAN('192.168.0.1').then(result => {
    console.log(result);
})

scanLAN('192.168.0.1', 10000, 100, 110).then(result => {
    console.log(result);
})
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
