import * as regmodel from '../models/regmodels.js'
import * as bmeal from '../models/Bookedmeals.js'

export const bmeals = async (req, res) => {
    const now = new Date()

    // Get the current day as a number (0 for Sunday, 1 for Monday, etc.)
    const day = now.getDay()
    const mo = now.getMonth() + 1;

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


    const currentDate = new Date();
    const nextDay = new Date(currentDate);

    nextDay.setDate(currentDate.getDate() + 1);

    const mo1 = now.getMonth() + 1;
    console.log(nextDay);

    const date1 = nextDay.getDate() + "/" + mo1 + "/" + nextDay.getFullYear()

    console.log("next date :", date1);


    const day1 = nextDay.getDay()

    const dayName1 = daysOfWeek[day1]

    console.log(" day :", day1);
    console.log("next day :", dayName1);



    // Format the dates
    const currentFormatted = currentDate.toDateString();
    const nextDayFormatted = nextDay.toDateString();

    console.log("Current date:", currentFormatted);
    console.log("Next day and date:", nextDayFormatted);



    const loginuser = await regmodel.users.find({ user_contact_number: req.body.contact_number });

    console.log(req.body);


    if (loginuser.length > 0) {
        console.log('Data is available')
        // Extract user_email data


        var uv = 0;
        // Example usage
        ; (async () => {


            const userrole = loginuser.map(user => user.user_role)

            if (userrole[0] == "hostelar") {

                const logingust = await regmodel.hosteler_regs.find({ hosteler_contact_number: req.body.contact_number });



                const fname = logingust[0]["hosteler_fname"];
                const role = logingust[0]["hostel_type"];
                const room = logingust[0]["room_no"];

                let flg = 0
                await bmeal.Bookedmeals
                    .find({
                        $and: [
                            { contact_number: req.body.contact_number },
                            { date: date1 }
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

                    const bmeals = new bmeal.Bookedmeals()
                    bmeals.fname = fname
                    bmeals.contact_number = req.body.contact_number
                    bmeals.room_no = room
                    bmeals.days = dayName1
                    bmeals.date = date1
                    bmeals.hostel_type = role
                    bmeals.breakfast = req.body.breakfast
                    bmeals.lunch = req.body.lunch
                    bmeals.dinner = req.body.dinner
                    bmeals.breakfast_attendance = false,
                        bmeals.lunch_attendance = false,
                        bmeals.dinner_attendance = false,

                        await bmeals.save();

                    console.log("if part");
                    console.log(date1);
                    console.log(req.body.contact_number);


                    const booking = await bmeal.Bookedmeals.find({ $and: [{ contact_number: req.body.contact_number }, { date: date1 }] });

                    res.status(200).json(booking)
                    console.log("if partttttt" + booking);

                }
                else {
                    console.log("else part");
                    res.status(400).json([])
                }




                console.log(req.body.breakfast);
                console.log(req.body.contact_number);
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

