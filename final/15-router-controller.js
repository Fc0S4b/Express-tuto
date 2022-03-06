let { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  res.status(201).send({ success: true, person: name });
};

const createPersonPostman = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  res.status(201).send({ success: true, data: [...people, name] });
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` });
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).json({ success: true, data: newPeople });
};

const deletePerson = (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` });
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  );
  return res.status(200).json({ success: true, data: newPeople });
};

module.exports = {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
};

//lo que hace este archivo es juntar las funciones de cada req (se intentaba hacer en una carpeta controllers, people.js), luego se eportan las funciones a router-people, router-auth tiene solo una función así que no es necesario configurarlo aparte.
//en router-people, están los req agrupados por tipo de ruta y escrito de forma resumida sin los controladores que los tiene este js, así el código se simplifica más

//este es el final del curso de Node y express fundamentals impartido por john Smilga, todo este material es de él, yo lo iba reescribiendo y comentando, lo encontré en el canal de youtube freeCodeCamp y a su vez en Codding Addict, tiene una página para ver slices, apuntes de esto en course-api.com y sus cursos en johnsmilga.com. Un verdadero maestro de la programación

//los temas que siguen son en la carrera de backend/Full-stack son:
//Complex REST API
//MERN APP
//y más proyectos
