// BUILD YOUR SERVER HERE

const express = require('express');
const Users = require('./users/model');

const server = express();

server.use(express.json());

//POST
server.post('/api/users', (req,res) => {
    const user = req.body

    if (!user.name || !user.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
        Users.insert(user)
          .then(newUser => {
              res.status(201).json(newUser)
          })
          .catch(err => {
              res.status(500).json({ message: "There was an error while saving the user to the database" })
          })  
    }
})


//GET
server.get('/api/users', (req, res) => {
    Users.find()
      .then(users => {
          res.json(users)
      })
      .catch(err => {
          res.status(500).json({ message: "The users information could not be retrieved" })
      })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
