import bcrpyt from 'bcrypt'
import * as regmodel from '../models/regmodels.js'

export const login = async (req, res) => {
  const loginuser = await regmodel.users.find({
    $or: [
      { user_email: req.body.email },
      { user_contact_number: req.body.contact_number }
    ]
  })

  console.log(req.body);


  if (loginuser.length > 0) {
    console.log('Data is available')
    // Extract user_email data
    const userpassword = loginuser.map(user => user.user_password)

    // console.log(userpassword[0]);

    // Compare the password with hash value stored in database
    // Hash a password
    const saltRounds = 10;
    

    // Verify a password
    async function verifyPassword (plaintextPassword, hashedPassword) {
        console.log(plaintextPassword,"=====",hashedPassword);
        const result=await bcrpyt.compareSync(plaintextPassword ,hashedPassword );
        console.log(result);
      return result
    }


    // Example usage
    ;(async () => {
      

    
      // Simulate verifying the password (replace with fetching from your database)
      const isPasswordCorrect = await verifyPassword(req.body.hpassword,userpassword[0]);
        

        console.log(isPasswordCorrect);
      if (isPasswordCorrect) {
        console.log('Password is correct')
        
      } else {
        console.log('Password is incorrect')
      }


    })();




  } else {
    console.log('Data is not available')
  }

  console.log(loginuser)

  res.send('<h1>login page<h1>')
  console.log('hello world')
}
