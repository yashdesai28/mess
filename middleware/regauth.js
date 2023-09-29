import bcrpyt from 'bcrypt'

//hostelar registration  midelwar
export const hregauth = async (req, res, next) => {
  console.log(' hosteler registrastion authentiction validation ')

  var nameRegex = /^[A-Za-z]+$/
  var email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  var phone = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/
  const passwordRegex = /^[a-zA-Z0-9]{5,9}$/

  const fname = req.body.fname
  const lname = req.body.lname
  const hemail = req.body.email
  const hcontact = req.body.contact_number
  const hpassword = req.body.hpassword
  const chpassword = req.body.chpassword
  const room = req.body.room_no
  const htype = req.body.hostel_type

  // Hash the password
  // const saltRounds = 10;
  // const hashedPassword = await bcrpyt.hash(hpassword, saltRounds);

  // const hashedPassword1 = await bcrpyt.hash(chpassword, saltRounds);

  // console.log("first",hashedPassword);
  // console.log("sec",hashedPassword1);

  //console.log(fname,lname,hemail,hcontact,hpassword,chpassword,room,htype);

  if (
    nameRegex.test(fname) &&
    nameRegex.test(lname) &&
    email.test(hemail) &&
    phone.test(hcontact) &&
    room != '' &&
    nameRegex.test(htype) &&
    passwordRegex.test(hpassword) &&
    hpassword == chpassword
  ) {
    next()
  } else {
    console.error('unauthorised')
    res.sendStatus(401)
  }
}

//guests registration  midelwar
export const gregauth = (req, res, next) => {
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



//guests registration  midelwar
export const userauthchek = (req, res, next) => {
  console.log('user chek validation ')

  
  var email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  var phone = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/


  const gemail = req.body.email
  const gcontact = req.body.contact_number



  console.log(req.body)

  if (
    email.test(gemail) ||
    phone.test(gcontact)
  ) {
    next()
  } else {
    console.error('unauthorised')
    res.sendStatus(401)
  }
}

