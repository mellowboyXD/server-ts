import * as http from "http"
import * as fs from "fs"

const hostname: string = "localhost";
const port: number = 42069;

let indexHTML: object;
let testHTML: object;

function throw404(res: any) {
    res.writeHead(404);
    res.end("<h1>Page Not Found!</h1>");
}

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");
    switch (req.url) {
        case "/":
            fs.exists(__dirname + "/pages/index.html", (exists: boolean) => {
                if (!exists) {
                    throw404(res);
                } else {
                    res.writeHead(200);
                    res.end(indexHTML);
                }
            })
            break;

        case "/test":
            fs.exists(__dirname + "/pages/test.html", (exists: boolean) => {
                if (!exists) {
                    throw404(res);
                } else {
                    res.writeHead(200);
                    res.end(testHTML);
                }
            })
            break;
        default:
            throw404(res);
    }
});

fs.promises.readFile(__dirname + "/pages/index.html")
    .then((contents: object) => indexHTML = contents)
    .catch(err => {
        console.log("Cannot readfile index.html", err);
        process.exit(1);
    });

fs.promises.readFile(__dirname + "/pages/test.html")
    .then((contents: object) => testHTML = contents)
    .catch(err => {
        console.log("Cannot readfile index.html", err);
        process.exit(1);
    });
server.listen(port, hostname, () => {
    console.log(`Serving at http://${hostname}:${port}`);
})
