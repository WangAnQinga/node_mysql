let express = require('express');
let api = require('../api.js')
let user = require('../controllers/user.js')
let bcrypt = require('bcryptjs');

const authenticate = require('../middleware/authenticate')



let router = express.Router();




router.post(api.userLogin, user.userLogin)

router.post(api.userLogout, user.userLogout)

router.post(api.userUpdate, user.update)

router.post(api.userRegister, user.userRegister)

router.get(api.userList, user.userList)

router.get('/me', authenticate, user.me)


module.exports = router