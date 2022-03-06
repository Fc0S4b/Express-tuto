//express es mas rápido, minimalista para crear web app  el comando para instalarlo es npm install express --save //esta última flag es para que en las versiones posteriores de node, el package no se guardará en package.json, es decir cuando hagas push en github y otra persona lo vea, no tendrá referecia al package, aún así el problema fué arreglado asi que se puede omitir.

const express = require("express");
const app = express();
// const app = require('express')(); forma alternativa

//forma mas reducida de crear un módulo http para entener funcionalidad básica de express, en el próximo se verá como se maneja express con las app
app.get("/", (req, res) => {
  console.log("user hit the resource");
  res.status(200).send("Home Page");
});

app.get("/about", (req, res) => {
  res.status(200).send("About Page");
});

app.all("*", (req, res) => { //se usa * y app.all para manejar todos los métodos que el usuario pida al servidor
  res.status(404).send("<h1>resource not found</h1>");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
// en cada res se accede al .status() para poder indicar el estatus y tener un mejor control de cada método

//estos son los métodos y como se usan:
// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen
