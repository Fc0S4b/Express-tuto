//ahora un ejemplo de como configurar express para abrir navbar-app

const express = require("express");
const path = require("path"); // path viene presintalado con node

const app = express();

// setup static and middleware
app.use(express.static("./public")); // static is a method that built in middleware
//en términos simples static es un archivo que el server no tiene que cambiarlo, por ejemplo en el caso de http donde teníamos que setear cada ruta en este caso se usa solo una carpeta estática que contiene todo o public. Lo static puede ser styles, images, javascript. Pero que pasa si javascript hace el browser dinámico, en términos del servidor es solo un archivo estático. Mas adelante se verá lo que es dinámico desde el rendering del lado del servidor. Recuerda este término "static assets" para referirse a esos archivos estáticos (si tengo que cambiar el  render antes de dar una respuesta entonces no aplica el término de estático)

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./navbar-app/index.html")); // puede ser .resolve o .join
});

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
