const express = require('express')
const router = express.Router()
const { login } = require('./controllers/login')
const { signup } = require('./controllers/signup')
const { logout } = require('./controllers/logout')
const { verifyJwt } = require('./controllers/verifyJwt')
const { getFavorites } = require('./controllers/getFavorites')
const { authenticate } = require('./controllers/authenticate')
const { updateFavorites } = require('./controllers/updateFavorites')
router.post('/login', login)
router.post('/signup', signup)
router.get('/logout', verifyJwt, logout)
router.get('/authenticate', verifyJwt, authenticate)
router.get('/getFavorites', verifyJwt, getFavorites)
router.patch('/updateFavorites', verifyJwt, updateFavorites)
module.exports = router