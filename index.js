//import http from 'http';
import express from 'express'
import mongoose from 'mongoose'
//import bodyParser from 'body-parser';
import multer from 'multer'
import { reg_router as regrouter } from './routes/registrastion.js'
import { login_router as loginrouter } from './routes/login.js'
//import * as reg from './controller/registrastion.js'

//conection code for mongodb
main().catch(err => console.log(err))

async function main () {
  await mongoose.connect('mongodb://127.0.0.1:27017/ganpatibapa')

  console.log('database is connected')
}

//acess form-body
const uplod = multer()

//start server
const server = express()
//create router
//const reg_router=express.Router();

//acess form-body
server.use(uplod.array())

server.use('/', regrouter)
server.use('/', loginrouter)

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
