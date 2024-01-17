"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var fs = require("fs");
var hostname = "localhost";
var port = 42069;
var indexHTML;
var testHTML;
function throw404(res) {
    res.writeHead(404);
    res.end("<h1>Page Not Found!</h1>");
}
var server = http.createServer(function (req, res) {
    res.setHeader("Content-Type", "text/html");
    switch (req.url) {
        case "/":
            fs.exists(__dirname + "/pages/index.html", function (exists) {
                if (!exists) {
                    throw404(res);
                }
                else {
                    res.writeHead(200);
                    res.end(indexHTML);
                }
            });
            break;
        case "/test":
            fs.exists(__dirname + "/pages/test.html", function (exists) {
                if (!exists) {
                    throw404(res);
                }
                else {
                    res.writeHead(200);
                    res.end(testHTML);
                }
            });
            break;
        default:
            throw404(res);
    }
});
fs.promises.readFile(__dirname + "/pages/index.html")
    .then(function (contents) { return indexHTML = contents; })
    .catch(function (err) {
    console.log("Cannot readfile index.html", err);
    process.exit(1);
});
fs.promises.readFile(__dirname + "/pages/test.html")
    .then(function (contents) { return testHTML = contents; })
    .catch(function (err) {
    console.log("Cannot readfile index.html", err);
    process.exit(1);
});
server.listen(port, hostname, function () {
    console.log("Serving at http://".concat(hostname, ":").concat(port));
});
