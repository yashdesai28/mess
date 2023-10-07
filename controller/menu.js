import * as menumodel from '../models/menu.js'
import bcrpyt from 'bcrypt'

export const add_menu = async (req, res) => {
    let flg = 0
    await menumodel.menus
        .find({ days: req.body.days })

        .then(menus => {
            if (menus.length > 0) {
                console.log('Data is available.')
                flg = 1
            } else {
                flg = 0
                console.log('Data is not available.')
            }
        })

    if (flg == 0) {
        const menu = new menumodel.menus()
        menu.days = req.body.days
        menu.Breakfast = req.body.Breakfast
        menu.Lunch = req.body.Lunch
        menu.Dinner = req.body.Dinner

        //user.save()

        menu
            .save()
            .then(result => {
                console.log('menu saved successfully:', result)
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
        res.status(200).json(req.body)
    } else {
        res.status(401).json(req.body)
        console.log('Data is available.')
    }
    //res.send("<h1>reg page<h1>");
}

export const show_menu = async (req, res) => {
    let flg = 0
    const now = new Date()

    // Get the current day as a number (0 for Sunday, 1 for Monday, etc.)
    const day = now.getDay()

    // Days are indexed from 0 (Sunday) to 6 (Saturday)
    const daysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]

    // Get the name of the current day
    const dayName = daysOfWeek[day]

    console.log(`Current day: ${dayName}`);

    await menumodel.menus
        .find({ days: dayName })

        .then(menus => {
            if (menus.length > 0) {
                console.log('Data is available.')
                res.status(200).json(menus)
                flg = 1
            } else {
                flg = 0
                res.status(401).json(req.body)
                console.log('Data is not available.')
            }
        })

    //res.send("<h1>reg page<h1>");
}
