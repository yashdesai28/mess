import express from 'express';
import * as menus from  '../controller/menu.js';
import * as menuauth from '../middleware/menuauth.js'


const menu_router=express.Router();

//api for login
menu_router
.post('/menu',menuauth.menu_auth,menus.add_menu)
.post('/shownextmenu',menus.show_next_menu)
.post('/smenu',menus.show_menu)
.post('/showmenu',menus.show_menu_handler)
.post('/allmenu',menus.show_menu_allday)

export {menu_router as menu_router}


