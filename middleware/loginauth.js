
//login midelwar 
export const loginauth=(req,res,next)=>{

    console.log("login authentiction");

    next();

};


export const forgotauth=(req,res,next)=>{

    console.log("forgotauth authentiction");

    var phone = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/
    const passwordRegex = /^[a-zA-Z0-9]{5,9}$/

    const hcontact = req.body.contact_number
    const hpassword = req.body.hpassword
    const chpassword = req.body.chpassword

    if (phone.test(hcontact) &&passwordRegex.test(hpassword) &&hpassword == chpassword){
        next()
    } else {
        console.error('unauthorised')
        res.sendStatus(401)
    }

};

