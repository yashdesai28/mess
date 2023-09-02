import http from 'http';
import  express  from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';



//start server 
const server=express();

// access to body 
server.use(express.json());

server.use((bodyParser.json()));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors({origin: '*',}));


// this is use to globel midelver 
// server.use((req,res,next)=>{

//     console.log(req.method,req.ip,req.hostname);
//     next();

// });



//hostelar registration  midelwar 
const hregauth=(req,res,next)=>{

    console.log(" hosteler registrastion authentiction validation ");

    var nameRegex = /^[A-Za-z]+$/;
    var email=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var phone=/^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

    const fname=req.body.fname;
    const lname=req.body.lname;
    const hemail=req.body.hemail;
    const hcontact=req.body.hcontect;
    //console.log(fname);
    

    if(nameRegex.test(fname)&&nameRegex.test(lname)&&email.test(hemail)&&phone.test(hcontact)){
        next();
    }
    else{
        console.error('unauthorised');
        res.sendStatus(401);
    }

   

};


//gust registration  midelwar 
const gregauth=(req,res,next)=>{

    console.log("gust registrastion authentiction validation ");

    var nameRegex = /^[A-Za-z]+$/;
    var email=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var phone=/^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

    const fname=req.body.fname;
    const lname=req.body.lname;
    const hemail=req.body.hemail;
    const hcontact=req.body.hcontect;
    console.log(fname,"iu",);
    console.log(lname,lname,hemail,hcontact);
    console.log(req.body);
    

    if(nameRegex.test(fname)&&nameRegex.test(lname)&&email.test(hemail)&&phone.test(hcontact)){
        next();
    }
    else{
        console.error('unauthorised');
        res.sendStatus(401);
    }

   

};


//login midelwar 
const loginauth=(req,res,next)=>{

    console.log("login authentiction");
   

    next();

};




//api for hostelar registration  
server.post('/hreg',hregauth,(req,res)=>{

    //res.send("<h1>reg page<h1>");
    res.json(req.body);
    console.log('hello world',req.body);

});


//api for gust registration 
server.post('/greg',gregauth,(req,res)=>{

    //res.send("<h1>reg page<h1>");
    res.json(req.body);
    console.log('hello world',req.body);

});



//api for login
server.post('/login',loginauth,(req,res)=>{

    res.send("<h1>login page<h1>");
    console.log('hello world');

});







//end of the server 
server.listen(8080,()=>{

    console.log("server is runing");

});
