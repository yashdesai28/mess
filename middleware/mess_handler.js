
//guests registration  midelwar
export const mess_handler_auth = (req, res, next) => {
    console.log('guests registrastion authentiction validation ')
  
    var nameRegex = /^[A-Za-z]+$/
    var email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    var phone = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/
    const passwordRegex = /^[a-zA-Z0-9]{5,9}$/
  console.log("ff");
  
    const fname = req.body.fname
    const lname = req.body.lname
    const gemail = req.body.email
    const gcontact = req.body.contact_number
    const gpassword = req.body.hpassword
    const cgpassword = req.body.chpassword
    console.log(fname, 'iu')
    console.log(lname, lname, gemail, gcontact, gpassword, cgpassword)
    console.log(req.body)
  
    if (
      nameRegex.test(fname) &&
      nameRegex.test(lname) &&
      email.test(gemail) &&
      phone.test(gcontact) &&
      passwordRegex.test(gpassword) &&
      gpassword == cgpassword
    ) {
      next()
    } else {
      console.error('unauthorised')
      res.sendStatus(401)
    }
  }
  