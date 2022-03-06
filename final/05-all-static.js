const express = require('express')
const path = require('path')

const app = express()

// setup static and middleware
app.use(express.static('./public'))
//básicamente lo que se comenta acá es la configuración para procersar el index.html pero se puede mover el index a la carpeta public y tendrá el mismo efecto que el resto de los archivos estáticos

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
//   adding to static assets
//   SSR
// })

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(5000, () => {
  console.log('server is listening on port 5000....')
})
