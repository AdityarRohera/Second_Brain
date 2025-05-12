import mongoose , {Schema , Document , Model}  from "mongoose";

interface UserType {
    userName :string,
    password : string
}

const userSchema : Schema<UserType> = new Schema({
    userName : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        trim : true,
    }
})

const userModel : Model<UserType> = mongoose.model('users' , userSchema);
export default userModel;