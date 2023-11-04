import * as bmeal from '../models/Bookedmeals.js'
import * as regmodel from '../models/regmodels.js'

export const analysis = async (req, res) => {

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


    // total current booking collection
    const allcountcollaction = await bmeal.Bookedmeals.countDocuments({ date: { $eq: date } });

    // res.status(200).json(allcountcollaction);

    console.log("number of current booking ", allcountcollaction)


    // total current booking for breakfast  collection
    const allbre = await bmeal.Bookedmeals.countDocuments({ $and: [{ date: date }, { breakfast: true }] });
    console.log("number of current booking for breakfast ", allbre);

    // total current booking for lunch  collection
    const alllun = await bmeal.Bookedmeals.countDocuments({ $and: [{ date: date }, { lunch: true }] });
    console.log("number of current booking for lunch ", alllun);

    // total current booking for dinner  collection
    const alldi = await bmeal.Bookedmeals.countDocuments({ $and: [{ date: date }, { dinner: true }] });
    console.log("number of current booking for Dinner ", alldi);

    //remaing food ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // total remaining student for having  breakfast_attendance  collection
    const breakfast_attendance = await bmeal.Bookedmeals.countDocuments({ $and: [{ date: date }, { breakfast_attendance: false }] });
    console.log("total remaining student for having  breakfast_attendance ", breakfast_attendance);

    // total remaining booking for breakfast_attendance  collection
    const lunch_attendance = await bmeal.Bookedmeals.countDocuments({ $and: [{ date: date }, { lunch_attendance: false }] });
    console.log("total remaining student for having  lunch_attendance ", lunch_attendance);

    // total remaining booking for breakfast_attendance  collection
    const dinner_attendance = await bmeal.Bookedmeals.countDocuments({ $and: [{ date: date }, { dinner_attendance: false }] });
    console.log("total remaining student for having  dinner_attendance ", dinner_attendance);



    //having food ++++++++++++++++++++++++++++++++++++++++++++++
    // total number student for having  breakfast_attendance  collection
    const breakfast_attendance1 = await bmeal.Bookedmeals.countDocuments({ $and: [{ date: date }, { breakfast_attendance: true }] });
    console.log("total number student for having  breakfast_attendance ", breakfast_attendance1);

    // total number booking for breakfast_attendance  collection
    const lunch_attendance1 = await bmeal.Bookedmeals.countDocuments({ $and: [{ date: date }, { lunch_attendance: true }] });
    console.log("total number student for having  lunch_attendance ", lunch_attendance1);

    // total number booking for breakfast_attendance  collection
    const dinner_attendance1 = await bmeal.Bookedmeals.countDocuments({ $and: [{ date: date }, { dinner_attendance: true }] });
    console.log("total number student for having  dinner_attendance ", dinner_attendance1);


    const total_hosteler = await regmodel.hosteler_regs.countDocuments({});
    console.log("total number hosteler ", total_hosteler);

    const remaing_submit = total_hosteler - allcountcollaction;

    console.log("total number of remaining =", remaing_submit);



    var analysis_data = {

        "total_current_booking": allcountcollaction,
        "total_number_hosteler": total_hosteler,
        "total_number_of_remaining_submit_from": remaing_submit,
        "current_booking_for_breakfast": allbre,
        "current_booking_for_lunch": alllun,
        "current_booking_for_dinner": alldi,
        "remaining_student_for_having_breakfast_attendance": breakfast_attendance,
        "remaining_student_for_having_lunch_attendance": lunch_attendance,
        "remaining_student_for_having_dinner_attendance": dinner_attendance,
        "total_number_student_for_having_breakfast_attendance": breakfast_attendance1,
        "total_number_student_for_having_lunch_attendance": lunch_attendance1,
        "total_number_student_for_having_dinner_attendance": dinner_attendance1

    }

    console.log(analysis_data)

    console.log(analysis_data["total_number_student_for_having_dinner_attendance"])

    res.status(200).json(analysis_data);


}

