//import http from 'http';
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import multer from 'multer'
import { reg_router as regrouter } from './routes/registrastion.js'
import { login_router as loginrouter } from './routes/login.js'
import {Change_Password as chpass} from './routes/Change-Password.js'
import {menu_router as menus_router} from './routes/menu.js'
import { showuserdata as show_user_data } from './routes/showuserdata.js';
import {notificationroter as notiroter } from './routes/notification.js'
import { bmeals_router as bookedmeals } from './routes/bookedmeals.js';
import {showmeal as showmeals}from './routes/viewqr.js'
import {attendance_router as attrouts} from './routes/attendance_booking.js';
import {analysis_router as analysis} from './routes/analysis.js'
import cors from 'cors'
//import * as reg from './controller/registrastion.js'

//conection code for mongodb
main().catch(err => console.log(err))

async function main () {
  await mongoose.connect('mongodb://127.0.0.1:27017/ganpatibapa')

  console.log('database is connected')
}

//acess form-body
const uplod = multer();

//start server
const server = express();
//create router
//const reg_router=express.Router();

//acess form-body
server.use(cors());
server.use(uplod.array())

server.use(bodyParser.urlencoded({ extended: true }));

server.use('/', regrouter)
server.use('/', loginrouter)
server.use('/',chpass)
server.use('/',menus_router)
server.use('/',show_user_data)
server.use('/',bookedmeals)
server.use('/',showmeals)
server.use('/',attrouts);
server.use('/',analysis)
server.use(express.json());
server.use('/',notiroter);

// access to body
server.use(express.json())

//server.use((bodyParser.json()));

//server.use(bodyParser.urlencoded({ extended: true }));
// server.use(cors({origin: '*',}));

// this is use to globel midelver
// server.use((req,res,next)=>{

//     console.log(req.method,req.ip,req.hostname);
//     next();

// });

// //api for hostelar registration
// reg_router
// .post('/hreg',hregauth,reg.hostelar_registrastion)
// //api for gust registration
// .post('/greg',gregauth,reg.gust_registrastion);

//end of the server
server.listen(8080, () => {
  console.log('server is runing')
})
