const express = require("express");
const app = express();
const morgan = require("morgan"); //se importa morgan
const logger = require("./logger");
const authorize = require("./authorize");

//  req => middleware => res

// app.use([logger, authorize])

// 1. use vs route //usar el método use o pasarlo directamente a la ruta del request
//2. options -our own / express / third party // our own: crear tus propias funciones middleware//express y terceros: express provee algunas funciones construidas para el middleware solo hay que referenciar desde los doc para importar los recursos

// app.use(express.static('./public'))//copiado desde express-app.js//app.use está esperando como parámetro un middleware, en este caso static es el middleware de express
//ejemplo de terceros: morgan npm para login (instalarlo con npm i morgan)

app.use(morgan("tiny")); //acá se usa un middleware de terceros, parámetro tiny para mostrar la data mas escencial//si quiero que se aplique a una ruta en específico, aplico como parámetro la ruta como se vió anteriormente

app.get("/", (req, res) => {
  res.send("Home");
});
app.get("/about", (req, res) => {
  res.send("About");
});
app.get("/api/products", (req, res) => {
  res.send("Products");
});
app.get(
  "/api/items",
  /*si queremos pasar a solo este request logger y authorize, simplemente escribimos como segundo parámetro [logger,authorize]*/ (
    req,
    res
  ) => {
    console.log(req.user);
    res.send("Items");
  }
);

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
