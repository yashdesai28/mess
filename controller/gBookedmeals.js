import * as regmodel from '../models/regmodels.js'
import * as bmeal from '../models/guestbookedmeals.js'

export const gbmeals = async (req, res) => {
    const now = new Date()

    // Get the current day as a number (0 for Sunday, 1 for Monday, etc.)
    const day = now.getDay()
    const mo = now.getMonth() + 1;

    const time = now.toLocaleTimeString();

    console.log(time);

    const date = now.getDate() + "/" + mo + "/" + now.getFullYear()

    console.log(now)
    console.log(mo);

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
    console.log('date', date);


    const loginuser = await regmodel.users.find({ user_contact_number: req.body.contact_number });

    console.log(req.body);


    if (loginuser.length > 0) {
        console.log('Data is available')
        // Extract user_email data


        var uv = 0;
        // Example usage
        ; (async () => {





            const logingust = await regmodel.guests_regs.find({ guest_contact_number: req.body.contact_number });


   
            const fname = logingust[0]["guest_fname"];

            let flg = 0
            await bmeal.gBookedmeals
                .find({
                    $and: [
                        { contact_number: req.body.contact_number },
                        { date: date }
                    ]
                })

                .then(meal => {
                    if (meal.length > 0) {
                        console.log('Data is available on meals .')
                        flg = 1
                    } else {
                        flg = 0
                        console.log('Data is not available on meals.')
                    }
                })


            if (flg == 0) {

                const bmeals = new bmeal.gBookedmeals()
                bmeals.fname = fname
                bmeals.contact_number = req.body.contact_number
                bmeals.days = dayName
                bmeals.date = date
                bmeals.time = time
                bmeals.lunch = true
                bmeals.lunch_attendance = false,
                    bmeals.quantity = req.body.quantity,
                    bmeals.amount = req.body.amount,

                    await bmeals.save();

                console.log("if part");

                console.log(req.body.contact_number);


                const booking = await bmeal.gBookedmeals.find({ $and: [{ contact_number: req.body.contact_number }, { date: date }] });

                res.status(200).json(booking)
                console.log("if partttttt" + booking);

            }
            else {
                console.log("else part");
                res.status(400).json([])
            }





        })();




    } else {
        console.log('Data is not available')
        res.status(401).json(res.body);
    }

    //console.log(loginuser)

    //res.status(401).json(res.body);
    console.log('end')
}

