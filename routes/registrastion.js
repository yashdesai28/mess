import express from 'express'
import * as reg from '../controller/registrastion.js'
import * as regauth from '../middleware/regauth.js'
import * as mess_handler_auth from '../middleware/mess_handler.js'

const server = express()

const reg_router = express.Router()

//api for hostelar registration
reg_router
  .post('/hreg', regauth.hregauth, reg.hostelar_registrastion)
  //api for gust registration
  .post('/greg', regauth.gregauth, reg.gust_registrastion)
  //user chek
  .post('/user',regauth.userauthchek,reg.user_chek)
  //mess_handler
  .post('/hnreg',mess_handler_auth.mess_handler_auth,reg.mess_handlar_registrastion)


export { reg_router as reg_router }
