import mongoose from "mongoose";

const { Schema } = mongoose;

const hosteler_registrastion_schema =new Schema({

    hosteler_fname:{type:String,require:[true,"first name is Required"]},
    hosteler_lname :{ type: String , require:[ true ,"last Name Is required"]},
    hosteler_email:{type : String , required:[true,"Email is Required"],unique:[true,"this email is already use"]},
    hosteler_contact_number:{type:Number,require:[true,"contact number is Required"],unique:[true,"this contact number is already use"]},
    room_no:String,
    hostel_type: {type: String,enum: {values: ['boys','girls'],message: '{VALUE} is not supported'}}
    

});


const guests_registrastion_schema =new Schema({

    guest_fname:{type:String,require:[true,"first name is Required"]},
    guest_lname :{ type: String , require:[ true ,"last Name Is required"]},
    guest_email:{type : String , required:[true,"Email is Required"],unique:[true,"this email is already use"]},
    guest_contact_number:{type:Number,require:[true,"contact number is Required"],unique:[true,"this contact number is already use"]}
    
});

const user_schema =new Schema({

 
    user_email:{type : String ,required:[true,"user Email is Required"],unique:[true,"this email is already use"]},
    user_password:{type:String,require:[true,"user password is Required"]},
    user_role:{type:String,require:[true,"user role is Required"]},
    user_status:{type:Number,require:[true,"user status is Required"]},
    user_contact_number:{type:Number,require:[true,"contact number is Required"],unique:[true,"this contact number is already use"]},

});


const mess_handler_schema =new Schema({

    handler_fname:{type:String,require:[true,"first name is Required"]},
    handler_lname :{ type: String , require:[ true ,"last Name Is required"]},
    handler_email:{type : String , required:[true,"Email is Required"],unique:[true,"this email is already use"]},
    handler_contact_number:{type:Number,require:[true,"contact number is Required"],unique:[true,"this contact number is already use"]},
    
    
});



export const mess_handler=mongoose.model('mess_handlers',mess_handler_schema);
export const hosteler_regs=mongoose.model('hosteler_regs',hosteler_registrastion_schema);
export const guests_regs=mongoose.model('guests_regs',guests_registrastion_schema);
export const users=mongoose.model('users',user_schema);