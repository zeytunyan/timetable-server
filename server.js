'use strict';
const http = require('http');
const urlModule = require('url');
// The default port is 1337
const port = process.env.PORT || 1337;

// Server creation
http.createServer(function (req, res) {
    // Headers needed for the script to work correctly
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

    // Take the path
    const pathname = urlModule.parse(req.url, true).pathname;

    // Homepage
    if (pathname === "/home" || pathname === "/") {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
<div style="margin: 10vmin auto; text-align: center">
    <h2>Hello!</h2>
    <pre>
This is the web service homepage.
To get the data, please change url.

Your url:  ${req.url};
Request method: ${req.method};
    </pre>
<h1>😉</h1>
</div>`);
    }
    else {
        // Trying to connect the module from the url
        try {
            const urlModule = require(`./pages${pathname}`);
            urlModule.sendXmlData(req, res);
        }
        catch (e) {
            // If an error occurs, but this is not a module connection error, then throw it
            if (e.code !== 'MODULE_NOT_FOUND') {
                throw e;
            }
            // 404
            else {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
<div style="margin: 10vmin auto; text-align: center">
    <h1>404!</h1>
    <pre>Sorry, page not found!</pre>
<h1>🙁</h1>
</div>`);
            }
        }
    }
}).listen(port, "localhost", (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});
