const express = require('express')
const app = express()
let { people } = require('./data')

// static assets
app.use(express.static('./methods-public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people })
})

app.post('/api/people', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })
  }
  res.status(201).json({ success: true, person: name })
})
//en postman se puede probar en tiempo real el método post sin la necesidad de configurar el front-end. Se escribe en la url (con método Post) localhost:5000/api/people que es la url de la api, luego en el body, en modo raw, se escribe texto json un objeto de propiedad name { "name": "john"} si el name existe en la api, la respuesta será existosa, si name es una cadena vacía, entonces dará el error 400

//por qué no crear otra ruta post:
//en postman al setear la url con el método post y escribir un json {"name": "peter"} se creará una respuesta 201 éxitosa
app.post('/api/postman/people', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  res.status(201).json({ success: true, data: [...people, name] }); //en vez de responder con 1 persona, mejor enviar todo people
})

app.post('/login', (req, res) => {
  const { name } = req.body
  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }

  res.status(401).send('Please Provide Credentials')
})
//put method for update data
//lo convencional es lo siguiente: si tenemos una lista en este caso una api y órdenes, si queremos editar o eliminar, tendremos que ir con nuestro parámetro de ruta donde efectivamente seteamos para órdenes api y luego vamos con :id, esto me llevará a tener un específico item. Hay múltiples otras maneras para setearlo pero por algo existe lo convencional que se usará

//en la url se enviará los parámetros y en el body se enviará los valores
//este método put tomara el parámetro de la url (el id) y actualizará el name de ese id de la database con el name del objeto json que se testea en postman {"name" = "peter"}, si id= 1, en la database que tiene name= john se cambiará por el name= peter
app.put('/api/people/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const person = people.find((person) => person.id === Number(id))

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` })
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name
    }
    return person
  })
  res.status(200).json({ success: true, data: newPeople })
})
//si el método es diferente entonces es una request diferente

//se eliminará un name con un id proporcionado en la url:
app.delete('/api/people/:id', (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id))
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` })
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  )
  return res.status(200).json({ success: true, data: newPeople })
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})


//solo al configurar estos métodos, la app se vuelve mas lenta, con express se puede solucinar mediante un ruteo convencional que es lo que viene en el siguiente módulo
//se creó una carpeta llamada routes el cual tiene auth y people, auth es para el req de login y people para los req de /api/people, en ambos archivos se importa express y configurar los routes, ahora este archivo 11-methods.js funcionará de la misma manera que 12-router-app.js, solo que este último es mucho más limpio y de mejor manejo, en el 12-router-app.js basta con usar los require para people y auth y con el método app.use se importarán los req de cada archivo