const express = require("express");
const app = express();

let { people } = require("./data"); // ahora trabajaremos con el arreglo de people alojado en data.js

//método post para insertar datos, se usará de ejemplo los archivos de la carpeta methods-public porque no podemos hacer ejemplos de post desde el navegador, otra forma de probar el método es usando la aplicación postman (insomnia es otro software popular para esto)

//en el index de methods-public hay un form con action ="/login" y method = "POST"
//cuando en http messages el body es opcional dentro de un req, pero en un cuando enviamos un post request es crucial tener un body

app.use(express.static("./methods-public"));
//parse form data
app.use(express.urlencoded({ extended: false })); //el flag de extended: false lo explica en los docs de express de express.urlencoded([options]), esta opción te permite elegir entre convertir la data url-encoded con la librería querystring o la qs library cuando es true (lo común es usar falso)//necesitamos este middleware para todas las peticiones que vienen, de esta forma tendremos acceso a los valores de form (el body del req post)

//parse json// esto manejará los datos que se envién y se hayan recepcionados con post
app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people }); //se verá los datos people en el navegador
});
//javascript option
//en los headers tenemos algo interesante, tenemos content-type:application/x-www-form-urlencoded para la request header y por supuesto esto irá en la aplicación y luego tenemos esta form url-encoded, esto es importante por que en javascript será un poco diferente
//haz click en la opción de javascript en la página
//en el javascript.html, en la form de javascript, no hay action ni method, aun asi hay atributo name. Hay un paquete axios que hace mas fácil setear las request de http, axios entrega una api mas limpia y mejor mensajes de errores

//cada vez que se escriban nombres en el form, se agregarán en el front-end con los otros nombres
app.post("/api/people", (req, res) => {
  const { name } = req.body; //el middleware app.use(express.json()) lo hace posible
  if (!name) {
    //si no se da el nombre dará este error:
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  //res.status(201).send('Sucess') //201 post req succesfull, pero mejor dar este mensaje:
  res.status(201).json({ success: true, person: name });
});

//manejando el envío de información:
app.post("/login", (req, res) => {
  ///login se encuentra en el action del form, si fuese en otro servidor habría que especificar la ruta completa
  //console.log(req.body) // se ve en consola {name: fco}
  const { name } = req.body;
  if (name) {
    //se puede configurar una lógica de if manejará los valores del formulario
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please Provide Credentials");
  //res.send('POST')// después de enviar algo en el formulario se mostrará el mensaje POST en pantalla
});
//falta el acceso que nos da al digitar el nombre en el formulario, no basta con responder con POST, esto lo agregamos con un middleware
//no tenemos el middleware que actualmente agrega esta data que el formulario está enviando a nuestra solicitud (request)

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
