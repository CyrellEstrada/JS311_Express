
const express = require('express')
// const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000
app.use(express.json())

const { users } = require('./state')
let counter = users.length

/* BEGIN - create routes here */
app.get('/users', (req, res) => {
  return res.json(users)
})

app.get('/users/:id', (req, res) => {
  return res.json(users.filter((user) => parseInt(req.params.id) === user._id))
})

app.post('/users', ((req, res) => {
  counter++
  const user = {...req.body, _id: counter}
  console.log(user, 'this is the user object')
  users.push(user)
  console.log(req.body, 'this is the reqwuest body')

  return res.json(users[users.length - 1])
}))

app.put('/users/1', (req, res) => {
  const user = users[0]
  user.name = "Cyrell"
  user.occupation = "Engineer"

  return res.json(users)
})

app.delete('/users/1', (req, res) => {
  const user = users.splice(0)[0]

console.log("code ran")
  return res.json(user), res.send("User deleted")
})
/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))