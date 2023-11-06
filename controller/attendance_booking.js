import * as bmeal from '../models/Bookedmeals.js'
import * as gmeal from '../models/guestbookedmeals.js'

export const hattendance = async (req, res) => {


    const type1 = req.body.typef;

    if (type1 == "b1") {

        const att = await bmeal.Bookedmeals.updateOne({ $and: [{ contact_number: req.body.contact_number }, { date: req.body.date }] }, { $set: { breakfast_attendance: true } });

        // res.status(200).json(att)
        console.log(att.modifiedCount);



        if (att.modifiedCount > 0) {
            res.status(200).json([]);
            console.log("if");
        } else {
            res.status(401).json([]);
            console.log("else");
        }


    } else if (type1 == "l1") {

        const att = await bmeal.Bookedmeals.updateOne({ $and: [{ contact_number: req.body.contact_number }, { date: req.body.date }] }, { $set: { lunch_attendance: true } });


        if (att.modifiedCount > 0) {
            res.status(200).json([]);
            console.log("if");
        } else {
            res.status(401).json([]);
            console.log("else l1");
        }



    }
    else if (type1 == "d1") {

        const att = await bmeal.Bookedmeals.updateOne({ $and: [{ contact_number: req.body.contact_number }, { date: req.body.date }] }, { $set: { dinner_attendance: true } });

        if (att.modifiedCount > 0) {
            res.status(200).json([]);
            console.log("if");
        } else {
            res.status(401).json([]);
            console.log("else");
        }



    }
}


export const gattendance = async (req, res) => {


    const type1 = req.body.typef;

    if (type1 == "l1") {

        const att = await gmeal.gBookedmeals.updateOne({ $and: [{ contact_number: req.body.contact_number }, { date: req.body.date }] }, { $set: { lunch_attendance: true } });


        if (att.modifiedCount > 0) {
            res.status(200).json([]);
            console.log("if");
        } else {
            res.status(401).json([]);
            console.log("else l1");
        }



    }





}



