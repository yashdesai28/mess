import express from 'express';
import * as bmeals from '../controller/gBookedmeals.js';


const gbmeals_router = express.Router();

//api for login
gbmeals_router
    .post('/gbookedmeals', bmeals.gbmeals)



export { gbmeals_router as gbmeals_router }


