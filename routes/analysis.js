import express from 'express';
import * as aa from  '../controller/analysis.js';


const analysis_router=express.Router();

//api for login
analysis_router
.post('/analysis',aa.analysis)
.post('/ganalysis',aa.guestanalysis)



export {analysis_router as analysis_router}


