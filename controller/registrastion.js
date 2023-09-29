import * as regmodel from '../models/regmodels.js'
import bcrpyt from 'bcrypt'


export const hostelar_registrastion = async (req, res) => {
  let flg = 0
  await regmodel.users
    .find({
      $or: [
        { user_email: req.body.email },
        { user_contact_number: req.body.contact_number }
      ]
    })
    
    .then(users => {
      if (users.length > 0) {
        console.log('Data is available.')
        flg = 1
      } else {
        flg = 0
        console.log('Data is not available.')
      }
    })

  if (flg == 0) {
    const hreg = new regmodel.hosteler_regs()
    hreg.hosteler_fname = req.body.fname
    hreg.hosteler_lname = req.body.lname
    hreg.hosteler_email = req.body.email
    hreg.hosteler_contact_number = req.body.contact_number
    hreg.room_no = req.body.room_no
    hreg.hostel_type = req.body.hostel_type

    hreg.save()

    const saltRounds = 10
    const hashedPassword = await bcrpyt.hashSync(req.body.hpassword, saltRounds)

    const user = new regmodel.users();
    


    user.user_email = req.body.email
    user.user_password = hashedPassword
    user.user_role = 'hostelar'
    user.user_status = '02'
    user.user_contact_number = req.body.contact_number

    //user.save()

    user
      .save()
      .then(result => {
        console.log('Hostel saved successfully:', result)
        // Handle success here, such as sending a success response to the client
      })
      .catch(error => {
        if (error.name === 'ValidationError') {
          // Handle validation errors here
          const validationErrors = {}
          for (const field in error.errors) {
            validationErrors[field] = error.errors[field].message
          }
          console.error('Validation errors:', validationErrors)
          // Optionally, send a custom error response to the client without revealing server details
          res
            .status(400)
            .json({ message: 'Validation error', errors: validationErrors })
        } else {
          // Handle other types of errors
          console.error('Error:', error)
          // Send an appropriate error response for non-validation errors
          res.status(500).json({ message: 'Internal server error' })
        }
      })
  } else {
    console.log('Data is available.')
  }

  console.log(req.body.lname)
  res.json(req.body)

  //res.send("<h1>reg page<h1>");
}

export const gust_registrastion = async (req, res) => {
  let flg1 = 0
  await regmodel.users
    .find({
      $or: [
        { user_email: req.body.email },
        { user_contact_number: req.body.contact_number }
      ]
    })
    .then(users => {
      if (users.length > 0) {
        console.log('Data is available.')
        flg1 = 1
      } else {
        flg1 = 0
        console.log('Data is not available.')
      }
    })

  if (flg1 == 0) {
    const greg = new regmodel.guests_regs()
    greg.guest_fname = req.body.fname
    greg.guest_lname = req.body.lname
    greg.guest_email = req.body.email
    greg.guest_contact_number = req.body.contact_number
    console.log(req.body.email)

    greg.save()

    const saltRounds = 10
    const hashedPassword = await bcrpyt.hashSync(req.body.hpassword, saltRounds)

    const user = new regmodel.users()

    user.user_email = req.body.email
    user.user_password = hashedPassword
    user.user_role = 'guests'
    user.user_status = '01'
    user.user_contact_number = req.body.contact_number

    user.save();
    res.status(200).json(req.body);
  } else {
    console.log('Data is available.');
    res.status(401).json(req.body);
    
  }  

  //res.send("<h1>reg page<h1>");
  
  //console.log('hello world',req.body);
}



export const user_chek = async (req, res) => {
  let flg1 = 0
  const users=await regmodel.users
    .find({
      $or: [
        { user_email: req.body.email },
        { user_contact_number: req.body.contact_number }
      ]
    })
    
      if (users.length > 0) {
        console.log('Data is available.')
        flg1 = 1
      } else {
        flg1 = 0
        console.log('Data is not available.')
      }
    

  if (flg1 == 0) {
    res.status(200).json(req.body);
  } else {
    console.log('Data is available.',users);
    res.status(401).json(users);
    
  }  

  
}

