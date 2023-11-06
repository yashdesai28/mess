import * as bmeal from '../models/Bookedmeals.js'
import * as regmodel from '../models/regmodels.js'
import * as gbook from '../models/guestbookedmeals.js'

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

export const guestanalysis = async (req, res) => {

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
    const allcountcollaction = await gbook.gBookedmeals.countDocuments({ date: { $eq: date } });
    const total_guest = await regmodel.guests_regs.countDocuments({});

    const totel_pepole = await gbook.gBookedmeals.aggregate([{ $match: { date: date } }, { $group: { _id: "$date", totalAmount: { $sum: "$quantity" } } }]);

    const totel_remain = await gbook.gBookedmeals.aggregate([{ $match: { $and: [{ date: date }, { lunch_attendance: false }] } }, { $group: { _id: "$date", totalAmount: { $sum: "$quantity" } } }]);

    const totel_having = await gbook.gBookedmeals.aggregate([{ $match: { $and: [{ date: date }, { lunch_attendance: true }] } }, { $group: { _id: "$date", totalAmount: { $sum: "$quantity" } } }]);

    const totel_money = await gbook.gBookedmeals.aggregate([{ $match: { date: date } }, { $group: { _id: "$date", totalAmount: { $sum: "$amount" } } }]);
  


    // res.status(200).json(allcountcollaction);

    console.log("demo=",totel_pepole);

    console.log("number of current booking ", allcountcollaction)
    console.log("total pepole", totel_pepole.length > 0 ? totel_pepole[0]["totalAmount"] : 0);
    console.log("total number of remaining lunch", totel_remain.length > 0 ? totel_remain[0]["totalAmount"] : 0);
    console.log("total number of having lunch", totel_having.length > 0 ? totel_having[0]["totalAmount"] : 0);
    console.log("total money for this day", totel_money.length > 0 ? totel_money[0]["totalAmount"] : 0);
    console.log("total number of guest ",total_guest);


    var analysis_data = {
        "number_of_current_booking": allcountcollaction,
        "total_of_guest":total_guest,
        "total_pepole": totel_pepole.length > 0 ? totel_pepole[0]["totalAmount"] : 0,
        "total_number_of_remaining_lunch": totel_remain.length > 0 ? totel_remain[0]["totalAmount"] : 0,
        "total_number_of_having_lunch": totel_having.length > 0 ? totel_having[0]["totalAmount"] : 0,
        "total_money_for_this_day": totel_money.length > 0 ? totel_money[0]["totalAmount"] : 0

    }

    console.log(analysis_data)



    res.status(200).json(analysis_data);




}

