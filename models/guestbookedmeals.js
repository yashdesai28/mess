import mongoose from "mongoose";

const { Schema } = mongoose;

const glunch_schema =new Schema({

    fname:{type:String,require:[true,"first name is Required"]},
    contact_number:{type:Number,require:[true,"contact number is Required"]},
    days:{type:String,require:[true,"days is Required"]},
    date:{type:String,require:[true,"date is Required"]},
    time:{type:String,require:[true,"time is Required"]},
    lunch:Boolean,
    lunch_attendance:Boolean,
    quantity:Number,
    amount:Number
});

export const gBookedmeals=mongoose.model('guestbookedmeals',glunch_schema);
