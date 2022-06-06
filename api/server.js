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

//GET/:id
server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
      .then(user => {
          if(!user) {
              res.status(404).json({ message: "The user with the specified ID does not exist" })
          } else {
              res.json(user)
          }
      })  
      .catch(err => {
          res.status(500).json({ message: "The user information could not be retrieved" })
      })
})

//DELETE
server.delete('/api/users/:id', (req, res) => {
    Users.remove(req.params.id)
      .then(possibleUser => {
          if(!possibleUser) {
              res.json(404).json({ message: "The user with the specified ID does not exist" })
          } else {
              res.status(200).json(possibleUser)
          }
      })
      .catch(err => {
          res.status(500).json({ message: "The user could not be removed" })
      })  
})

//PUT
server.put('/api/users/:id', (req, res) => {
    Users.update(req.params.id, req.body)
      .then(possibleUser => {
          if (!possibleUser) {
              res.status(404).json({ message: " The user with the specified ID does not exist" })
          } else if (!user.name || !user.bio) {
              res.status(400).json({ message: "Please provide name and bio for the user" })
          } else {
              res.json(possibleUser)
          }
      }) 
      .catch(err => {
          res.status(500).json({ message: "The user informaiton could not be modified" })
      }) 
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
