import * as  notificationcontrol from '../controller/notification.js'
import express from 'express';

const notificationroter=express.Router();

notificationroter.post("/sendnoti",notificationcontrol.sendNotification);

export {notificationroter as notificationroter}