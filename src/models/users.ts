import mongoose,{Schema} from "mongoose";

const UserSchema=new Schema({
    Name:String,
    Role:String,
    email:String,
    password:String,
    isStudent:String,
    timing:[String],
    timeSlot:String,
    date:String,
    allowslot:String

});

const userModel=mongoose.model('User',UserSchema);
export default userModel;