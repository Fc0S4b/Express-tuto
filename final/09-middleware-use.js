const express = require('express')
const app = express()
const logger = require('./logger')
const authorize = require('./authorize')
//  req => middleware => res
app.use([logger, authorize])//múltiples funciones middleware en conjunto en un arreglo, el orden importa, primero se aplica logger y después authorize
// api/home/about/products
app.get('/', (req, res) => {
  res.send('Home')
})
app.get('/about', (req, res) => {
  res.send('About')
})
app.get('/api/products', (req, res) => {
  res.send('Products')
})
app.get('/api/items', (req, res) => {
  console.log(req.user); //se ve el objeto {name: 'john', id:3} como adjuntado desde authorize.js al request de items
  res.send("Items");
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
