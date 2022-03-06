const http = require("http");

const server = http.createServer((req, res) => {
  console.log("user hit the server");
  res.end("home page"); //utilizo un método para responder, en el servidor se ve el mensaje de home page
  //Este método le indica al servidor que se han enviado todos los encabezados y el cuerpo de la respuesta; ese servidor debe considerar este mensaje completo. El método, response.end()DEBE llamarse en cada respuesta.
  //end indica que la comunicación esta terminada
});

server.listen(5000); //en el desarrollo web el uso de algún puerto es arbitrario pero cuando ya se implementa se debe elegir un puerto definido. En wikipedia hay varias definiciones para distintos puertos. En las herramientas del desarrollador, Network, se verá en la start line de la página que utiliza una dirección ip + puerto para realizar la petición ej. ip:443, el puerto 443 asegura la transferencia correcta de archivos o algo así, busca en wiki.
