//en express se puede llegar a elegir una de dos opciones, setear API o setear templates con server side rendering
//cuando hablamos de setear API estamos refiréndonos a setear una interface http para que interactúe con nuestros datos, ahora los datos son enviados usando json que es un estándar de notación de objetos de javascript y en orden de enviar de vuelta nuestra respuesta, usaremos el método res.json que se encargará del content-type y encadenará (stringify) nuestra data
//por otro lado tenemos el server side render SSR que nos permite setear plantilals y enviarlas de vuelta completa en html, css y js nosotros mismos y haremos eso usando el método res.render
//basic json

const express = require('express')
const app = express()
const { products } = require('./data')


app.get('/', (req, res) => {
  res.json(products) //products es importado desde data.js también se pueden escribir arreglos de objetos directamente
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
