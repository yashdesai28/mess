import mongoose from "mongoose";

const { Schema } = mongoose;

const menu = new Schema({


    days: { type: String, required: [true, " day is Required"], unique: [true, "this is alreadu use"] },
    Breakfast: { type: String, require: [true, "Breakfast Required"] },
    Lunch: { type: String, require: [true, " Lunch  Required"] },
    Dinner: { type: String, require: [true, "Dinner Required"] },


});

export const menus=mongoose.model('menus',menu);
