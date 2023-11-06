import express from 'express'
import * as qr from '../controller/viewqr.js'

const server = express()
const showmeal = express.Router()

//api for hostelar registration
showmeal
    // guest data show for admin penal
    .post('/showmeals',qr.bmeals)
    .post('/gshowmeals',qr.guestbmeals)
    //hoster data show for admin penal
    

    
  

export { showmeal as showmeal }