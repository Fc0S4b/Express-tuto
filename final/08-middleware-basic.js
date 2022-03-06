

const express = require("express");
const app = express();
const { products } = require("./data");
const logger = require("./logger");

// req => middleware => res

app.use(logger);

//middleware function
// const logger= (req, res,next)=>{ //siempre se debe pasar un next para pasar al siguiente middleware, al menos que el ciclo termine en enviando de vuelta la respuesta
//      const method = req.method;
//      const url = req.url;
//      const time = new Date().getFullYear();
//      console.log(method, url, time);
//      //res.send('Testing') //estoy enviando de vuelta un testing si no no termina de cargar la página
//      next()//probemos algo menos bruto que lo de la línea de arriba //se cargará la página exitósamente con un mensaje en consola sobre el año en que estamos
// }
//logger sería nuestra primera función middleware sin embargo se ve un poco torpe, es preferible tenerla en un archivo aparte eso hará que sea más limpio app.js (o el archivo actual en que está este código)

//que pasa si quiero agregar esta funcionalidad a 50 rutas distintas, manualmente sería tedioso, sería mejor si existiera un método que agregara la función middleware a cualquier ruta, para esto creo un archivo externo con la función logger y la importo a este archivo asignándolo una const logger luego en segundo lugar es usar el método use, entonces escribimos app.use(logger) y todos los get usarán logger y no necesariamente tendrá que tener logger de parámetro (lo comenté el parámetro logger para que se entienda la idea)
//dos cosas: primero, el orden importa aqui, si se pone después el app.use del get de home, entonces home no tendrá esa funcionalidad, lo segundo es que podemos agregar una ruta al app.use por ejemplo si agrego app.use('/api', logger), logger funcionará para todas las rutas que estén el directorio de /api, si se omite la ruta, se aplicará a todos los request

app.get(
  "/",
  /*logger,*/ (req, res) => {
    //acá tengo una funcionalidad escrita para la página home, ahora si quiero hacer lo mismo para about se puede copiar y pegar, pero que pasa si tengo que hacerlo para 15 rutas distintas? una mejor solución sería si seteamos una función y en esta función tenemos toda esta lógica y luego puedo solo adjuntarla casi a todas mis rutas dicho de otra forma, para algunas rutas quizas quiera adjuntar y para algunas quizas no. Para esto creamos una función arriba llamada logger y lo pasamos a la ruta del get como parámetro
    // const method = req.method;
    // const url = req.url;
    // const time = new Date().getFullYear();
    // console.log(method, url, time)
    res.send("Home");
  }
);

app.get(
  "/about",
  /*logger,*/ (req, res) => {
    res.send("About");
  }
);

app.get(
  "/api/products",
  /*logger,*/ (req, res) => {
    res.send("Products");
  }
);

app.get("/api/items",
  /*logger,*/ (req, res) => {
    res.send("Items");
  }
);

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
