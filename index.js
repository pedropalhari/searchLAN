var request = require('request');
var rp = require('request-promise-native');

function reflect(promise) {
    return promise.then(function (v) { return { v: v, status: "resolved" } },
        function (e) { return { e: e, status: "rejected" } });
}
/**
 * Promise that returns a string array containing all reachable ip addresses
 * @param {String} ip IP to scan the last digits, for example, '192.168.0.1' will scan from .1 to .255
 * @param {Number} timeout (optional) Timeout of the requests, defaults for 5000ms
 * @param {Number} from (option) The lesser bound of the search, defaults to 1
 * @param {Number} to (option) The upper bound of the search, defaults to 255
 * 
 * @example  * 
 * //Scans the entire LAN
 * scanLAN('192.168.0.1').then(result => {
 *      console.log(result);
 * })
 * 
 * //Scans part of it
 * scanLAN('10.11.0.1').then(result => {
 *      console.log(result);
 * })
 * @returns {Promise<String[]>}
 */
function scanLAN(ip, timeout = 5000, from = 1, to = 255) {
    var objIps = [];
    var promises = [];
    var url = 'http://' + ip.slice(0, ip.lastIndexOf('.') + 1);

    for (var i = from; i < to; i++) {
        promises.push(rp({
            url: url + i,
            timeout: timeout,
            callback: function (error, response, body) {
                if (error)
                    if (error.code == 'ETIMEDOUT' || error.code == 'EHOSTUNREACH') return;
                    else objIps.push({ ip: error.address, error: error.code });
                else if (response)
                    objIps.push({ ip: response && response.req._headers.host });
            }
        }));
    }

    var promiseRetorno = Promise.all(promises.map(reflect)).then((results) => {
        objIps = objIps.sort((objA, objB) => {
            var stringA = objA.ip;
            var stringB = objB.ip;

            var lastA = parseInt(stringA.substring(stringA.lastIndexOf('.') + 1)); //1 ~ 255
            var lastB = parseInt(stringB.substring(stringB.lastIndexOf('.') + 1)); //1 ~ 255

            return lastA - lastB;
        });

        var ips = objIps.map(obj => {
            return obj.ip;
        })

        return ips;
    });

    return promiseRetorno;
}

module.exports = scanLAN;
