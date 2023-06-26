const express = require('express')
const router = express.Router()

const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController')
const verifyTokenJwt = require('./middlewares/verifyTokenJwt')

// Test Route
router.get('/', (_request, response) => {
  response.send('Essa é uma rota de teste! A API está funcionando')
})

// User Routes
router.post('/auth/register', UserController.register)
router.post('/auth/login', UserController.login)
router.get('/users', verifyTokenJwt, UserController.index)
router.get('/users/:id', verifyTokenJwt, UserController.show)
router.put('/users/:id', verifyTokenJwt, UserController.update)
router.delete('/users/:id', verifyTokenJwt, UserController.delete)

// Tasks Routes
router.get('/tasks', verifyTokenJwt, TaskController.index)
router.get('/tasks/:id', verifyTokenJwt, TaskController.show)
router.post('/tasks', verifyTokenJwt, TaskController.store)
router.put('/tasks/:id', verifyTokenJwt, TaskController.update)
router.patch('/tasks/:id', verifyTokenJwt, TaskController.updateCompleted)
router.delete('/tasks/:id', verifyTokenJwt, TaskController.delete)

module.exports = router
