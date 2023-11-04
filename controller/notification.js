import admin from 'firebase-admin'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const serviceAccountPath = path.resolve(
  __dirname,
  '../config/push-notification-key.json'
)
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const sendNotification = (req, res) => {
  try {
    const message = {
      notification: {
        title: 'test notification',
        body: 'notification message'
      },
      data: {
        orderId: "123456",
        orderDate: '2022-10-28'
      },
      token: req.body.fcm_token
    }

    admin
      .messaging()
      .send(message)
      .then(response => {
        console.log('Successfully sent message:', response)
        return res.status(200).send({
          message: 'Notification sent'
        })
      })
      .catch(error => {
        console.error('Error sending message:', error)
        return res.status(500).send({
          message: error
        })
      })
  } catch (err) {
    console.error(err)
    // handle error
    return res.status(500).send({
      message: err.message
    })
  }
}

export { sendNotification }
