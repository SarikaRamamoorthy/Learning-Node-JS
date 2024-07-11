const http = require('http');
const fs = require('fs');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCards = fs.readFileSync(`${__dirname}/templates/template-cards.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    /*
    const path = req.url;
    console.log(path);
    console.log(url.parse(req.url, true));
    url module is used to parse the url
    */
    const {pathname, query} = url.parse(req.url, true);
    if(pathname === '/' || pathname === '/overview'){
        // overview
        res.writeHead(200, {
            'Content-type' : 'text/html'
        }); 
        const cardsHtml = dataObj.map(el => replaceTemplate(templateCards, el)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    }
    else if(pathname === '/product') {
        // product
        res.writeHead(200, {
            'Content-type' : 'text/html'
        }); 
        const product = dataObj[query.id];
        const output = replaceTemplate(templateProduct, product);
        res.end(output);
    }
    else if(pathname === '/api') {
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
    console.log("Server listening on port 8000");
});