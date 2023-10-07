import bcrpyt from 'bcrypt'
import * as regmodel from '../models/regmodels.js'


export const Change_Password = async (req, res) => {
  const loginuser = await regmodel.users.find({
    user_contact_number: req.body.contact_number
  })

  console.log(req.body)

  if (loginuser.length > 0) {
    console.log('Data is available')
    // Extract user_email data
    const userpassword = loginuser.map(user => user.user_password)

    // console.log(userpassword[0]);

    // Compare the password with hash value stored in database
    // Hash a password
    const saltRounds = 10

    // Verify a password
    async function verifyPassword (plaintextPassword, hashedPassword) {
      console.log(plaintextPassword, '=====', hashedPassword)
      const result = await bcrpyt.compareSync(plaintextPassword, hashedPassword)
      console.log(result)
      return result
    }

    var uv = 0
    // Example usage
    ;(async () => {
      // Simulate verifying the password (replace with fetching from your database)
      const isPasswordCorrect = await verifyPassword(
        req.body.hpassword,
        userpassword[0]
      )

      console.log(isPasswordCorrect)
      if (isPasswordCorrect) {
        uv = 1
        console.log('Password is correct')
      } else {
        uv = 0
        console.log('Password is incorrect')
      }

      if (uv == 1) {
        const saltRounds = 10
        const hashedPassword = await bcrpyt.hashSync(
          req.body.newpassword,
          saltRounds
        )

        const up = await regmodel.users.updateOne(
          { user_contact_number: req.body.contact_number },
          { $set: { user_password: hashedPassword } }
        )

        console.log('password update')

        console.log(loginuser)
        console.log(up)
        res.status(200).json(res.body)
      } else {
        console.log('uv else call')
        res.status(401).json(res.body)
      }
    })()
  } else {
    console.log('Data is not available')
    res.status(401).json(res.body)
  }

  //console.log(loginuser)

  //res.status(401).json(res.body);
  console.log('end')
}
