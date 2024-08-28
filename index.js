
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
  return res.json(users.find((user) => parseInt(req.params.id) === user._id))
})

app.post('/users', ((req, res) => {
  counter++
  const user = {...req.body, _id: counter}
  console.log(user, 'this is the user object')
  users.push(user)
  console.log(req.body, 'this is the reqwuest body')

  return res.json(users[users.length - 1])
}))

app.put('/users/:usersId', (req, res) => {
  const index = users.findIndex((user) => {
    return user._id == req.params.usersId
  })
  

  users[index].name = req.body.name
  users[index].occupation = req.body.occupation

  return res.json(users)
})

app.delete('/users/:usersId', (req, res) => {
  // console.log(req, "These are your parameters")
  const index = users.findIndex((user) => {
    return user._id == req.params.usersId
  })
  const deletedUser = users.splice(index, 1)

console.log("code ran")
  return res.json({
    message: "User Deleted",
    user: deletedUser
  })
})
/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))