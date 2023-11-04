import express from 'express';
import * as att from  '../controller/attendance_booking.js';


const attendance_router=express.Router();

//api for login
attendance_router
.post('/hatt',att.hattendance)



export {attendance_router as attendance_router}


