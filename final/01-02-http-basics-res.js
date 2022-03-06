const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" }); //el content-type es importante porque si no se configura como text/html entonces no se mostrará la respuesta como html
  //el status code es importante saberlo usar, estudia las definiciones de cada estado para saber como responder a las solicitudes
  //mime type buscalo en MDN que son los valores de content-type
  res.write("<h1>home page</h1>"); //se puede pasar el argumento directamente a res.end pero esta forma es mas ordenada
  res.end();
});

server.listen(5000);
