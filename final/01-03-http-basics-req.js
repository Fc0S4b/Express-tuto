const http = require("http");

const server = http.createServer((req, res) => {
  //console.log(req.method)//este log mostrará el request en consola que devolverá el método que está utilizando en este caso GET. el req es un objeto gigante que tiene hartas propiedades, una de ellas es method, otra puede ser url (req.url), y así sucesivamente
  //ahora configuraremos la petición para que haya una respuesta determinada según el tipo de solicitud:
  const url = req.url;
  //home page
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>home page</h1>");
    res.end();
  }
  //about page
  else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>about page</h1>");
    res.end();
  } //404// cuando se solicita una página que no existe. en Node docs hay una forma de pasar un método tal que muestre el estatus code como respuesta en la misma página
  else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>page not found</h1>");
    res.end();
  }
});

server.listen(5000);
