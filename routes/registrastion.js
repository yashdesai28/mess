import express from 'express'
import * as reg from '../controller/registrastion.js'
import * as regauth from '../middleware/regauth.js'

const server = express()

const reg_router = express.Router()

//api for hostelar registration
reg_router
  .post('/hreg', regauth.hregauth, reg.hostelar_registrastion)
  //api for gust registration
  .post('/greg', regauth.gregauth, reg.gust_registrastion)
  //user chek
  .post('/user',regauth.userauthchek,reg.user_chek)


export { reg_router as reg_router }
