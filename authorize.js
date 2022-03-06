const authorize = (req, res, next) =>{
    const {user} = req.query;
    if (user === "john") {
      // si localhost:5000/?user=john es verdadero entonces se da acceso a home
      req.user = { name: "john", id: 3 };
      next();
    }
    // console.log('authorize')
    // next()
    //esta no es la forma en que se autoriza usuarios en aplicaciones express es solo un ejemplo (si solo tengo eso lo comentado menos la sentencia if/else)
    else {
      res.status(401).send("Unauthorized"); //de lo contrario no está autorizado
    }
}


module.exports = authorize

