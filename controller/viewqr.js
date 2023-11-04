import * as bmeal from '../models/Bookedmeals.js'

export const bmeals = async (req, res) => {


    const booking = await bmeal.Bookedmeals.find({ $and: [{ contact_number: req.body.contact_number }, { date:req.body.date }] });

    if(booking.length>0){
        res.status(200).json(booking)
        console.log(booking);
    }
    else{
        res.status(401).json(res.body)
        console.log("not data");
    }

    console.log('end')
}

