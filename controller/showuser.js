import * as regmodel from '../models/regmodels.js'



export const showgu = async (req, res) => {
    const loginuser = await regmodel.guests_regs.find({});

    console.log(req.body);


    if (loginuser.length > 0) {
        console.log('Data is available')

        console.log(loginuser);

        res.status(200).json(loginuser);


    } else {
        console.log('Data is not available')
        res.status(401).json(res.body);
    }

    //console.log(loginuser)

    //res.status(401).json(res.body);
    console.log('end')
}


export const showho = async (req, res) => {
    const loginuser = await regmodel.hosteler_regs.find({});

    console.log(req.body);


    if (loginuser.length > 0) {
        console.log('Data is available')

        console.log(loginuser);

        res.status(200).json(loginuser);


    } else {
        console.log('Data is not available')
        res.status(401).json(res.body);
    }

    //console.log(loginuser)

    //res.status(401).json(res.body);
    console.log('end')
}


export const showme = async (req, res) => {
    const loginuser = await regmodel.mess_handler.find({});

    console.log(req.body);


    if (loginuser.length > 0) {
        console.log('Data is available')

        console.log(loginuser);

        res.status(200).json(loginuser);


    } else {
        console.log('Data is not available')
        res.status(401).json(res.body);
    }

    //console.log(loginuser)

    //res.status(401).json(res.body);
    console.log('end')
}



