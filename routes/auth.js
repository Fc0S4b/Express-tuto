const express = require('express');
const router = express.Router()



router.post("/", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }

  res.status(401).send("Please Provide Credentials");
});

module.exports = router

//ver importación en router-app.js

const router = express.Router() 
