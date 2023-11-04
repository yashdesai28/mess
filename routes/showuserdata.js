import express from 'express'
import * as showdata from '../controller/showuser.js' 

const server = express()
const showuserdata = express.Router()

//api for hostelar registration
showuserdata
    // guest data show for admin penal
    .post('/showgh',showdata.showgu)
    //hoster data show for admin penal
    .post('/showho',showdata.showho)
    //mess handler data show for admin penal
    .post('/showme',showdata.showme);

    


export { showuserdata as showuserdata }