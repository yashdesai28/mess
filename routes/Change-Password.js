import express from 'express'
import * as chpass from '../controller/Change-Password.js'
import * as chpass_auth from '../middleware/Change-Password-auth.js'

const Change_Password=express.Router();

//api for login
Change_Password
.post('/chpass',chpass.Change_Password);

export {Change_Password as Change_Password} 