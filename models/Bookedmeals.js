import mongoose from "mongoose";

const { Schema } = mongoose;

const Dining_schema =new Schema({

    fname:{type:String,require:[true,"first name is Required"]},
    contact_number:{type:Number,require:[true,"contact number is Required"]},
    room_no:String,
    days:{type:String,require:[true,"days is Required"]},
    date:{type:String,require:[true,"date is Required"]},
    hostel_type: {type: String,enum: {values: ['boys','girls'],message: '{VALUE} is not supported'}},
    breakfast:Boolean,
    lunch:Boolean,
    dinner:Boolean,
    breakfast_attendance:Boolean,
    lunch_attendance:Boolean,
    dinner_attendance:Boolean,
});

export const Bookedmeals=mongoose.model('bookedmeals',Dining_schema);
