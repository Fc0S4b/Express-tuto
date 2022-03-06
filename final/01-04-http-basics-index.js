//como configurar un res.write con un index.html para no escribir el html directamente:

const http = require("http");
const { readFileSync } = require("fs");

// get all files
const homePage = readFileSync("./index.html"); // "./" porque está en la misma carpeta que 02-express-tutorial
//solo requiere una vez index no a cada rato por eso se usa forma sincrónica además es solo un ejemplo

const server = http.createServer((req, res) => {
  const url = req.url;
  //home page
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePage); //acá va la variable
    res.end();
  }
  //about page
  else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>about page</h1>");
    res.end();
  } //404//
  else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>page not found</h1>");
    res.end();
  }
});

server.listen(5000);
