import express from 'express';
import * as login from  '../controller/login.js';
import * as loginauth from '../middleware/loginauth.js'

const login_router=express.Router();

//api for login
login_router
.post('/login',loginauth.loginauth,login.login)
.post('/forgotpassword',loginauth.forgotauth,login.forget)
.post('/show',login.show)
.post('/showh',login.showh);

export {login_router as login_router}


