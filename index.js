const fs = require('fs');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');

const dataObj = JSON.parse(data);

const http = require('http');
const server = http.createServer((req, res) => {
    const path = req.url;
    if(path === '/' || path === '/overview'){
        // overview
        res.end("Overview");
    }
    else if(path === '/product') {
        // product
        res.end("Product page");
    }
    else if(path === '/api') {
        res.writeHead(200, {
            'Content-type':'application/json'
        });
        res.end(data);
    }
    else{
        //page not found
        res.end("page not found");
    }
});

server.listen(8000,'127.0.0.1',() => {
    console.log("Server listening on port 8080");
});