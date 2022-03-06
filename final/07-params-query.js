const express = require("express");
const app = express();
const { products } = require("./data");

app.get("/", (req, res) => {
  res.send('<h1> Home Page</h1><a href="/api/products">products</a>');
});
app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    //con esta función no envío todo el contenido del products en el json
    const { id, name, image } = product;
    return { id, name, image };
  });

  res.json(newProducts);
});
//pero aun así falta rutear los parámetros:
//esta forma sirve pero buscar de 1 parámetro se hace un lío cuando en el json existen mas de 200 por decir un número
// app.get("/api/products/1", (req, res) => {

//     const singleProduct = products.find((product)=>product.id === 1)

//     res.json(singleProduct)
// });

//acá los tratamos todos
app.get("/api/products/:productID", (req, res) => {
  // console.log(req)
  // console.log(req.params)
  const { productID } = req.params;

  const singleProduct = products.find(
    (product) => product.id === Number(productID) //el id es number, a veces es string y no necesita convertirse
  );
  if (!singleProduct) {
    // un if para manejar el caso en que no exista el parámetro buscado
    return res.status(404).send("Product Does Not Exist");
  }

  return res.json(singleProduct);
});
//parámetros de ruta
//la síntaxis de : puede ser compleja, por ejemplo acá se buscan las reseñas independiente de su número, al hacer un log en req.params se devolverá un objeto con productID: '4', reviewID: 'abc' que es lo que se tenía tipeado en el localhost, si se cambia reviewID no hay problema pero si se cambia reviews por review, hay un error porque review no es un parámetro de ruta y por lo tanto no es un marcador de posición (placeholder) en otras palabras, usar review no funcionaría porque está seteado con reviews, el marcador de posición da lo mismo cambiarlo porque lleva :
app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  console.log(req.params);
  res.send("hello world");
});
//parámetros de cadena de consultas o conocido también como parámetros url
//sirve para mandar un montón de información basada usando la url, estos parámetros son usados para querys database o resultados filtrados. Será bueno para los programadores del servidor que tengan que ajustarlo decidiendo que parámetros aceptar y que funcionalidad dependerá de esos valores

//un ejemplo de api para obtener datos es siguiendo una estructura que muestra la página https://hn.algolia.com/api, aqui el modo de configuración es /api/número de version/consulta que se delimita por un ? propiedad1= valor1&propiedad2 = valor2
//la forma genérica de buscar propiedades es a través de search y limit
app.get("/api/v1/query", (req, res) => {
  // console.log(req.query)
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search); //startsWith es para indicar que la letra ingresada al valor de search esté ligada a los resultados que empiecen con esa letra
    });
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit)); //si limit es 4, mostrará los 4 objetos del json
  }
  if (sortedProducts.length < 1) {
    //si no coincide alguna letra mostrará un status 200 y un mensaje:
    // res.status(200).send('no products matched your search');//esta es una forma alternativa de escribir una respuesta
    return res.status(200).json({ sucess: true, data: [] }); //esto es mas convencional, se muestra un objeto que dice que la request fue hecha con éxito pero que no hay data. //sin return habría un error ya que se confundiría el server porque solo para 1 petición hay una respuesta y no 2
  }
  res.status(200).json(sortedProducts); //si no se busca nada, muestra toda la data, hay otras formas de escribir el query para filtrar mejor (ver la página ejemplo)
});
//por lo general las api tienen querys que se pueden filtrar y ordenar pero hay algunas que no y por eso se trabaja como al principio
app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
