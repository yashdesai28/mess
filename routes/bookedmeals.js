import express from 'express';
import * as bmeals from  '../controller/Bookedmeals.js';


const bmeals_router=express.Router();

//api for login
bmeals_router
.post('/bookedmeals',bmeals.bmeals)



export {bmeals_router as bmeals_router}


