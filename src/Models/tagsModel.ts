import mongoose , {Schema , Model}  from "mongoose";

interface tagsType {
    tag : string
}

const tagSchema : Schema<tagsType> = new Schema({
    tag : {
        type : String,
        required : true,
        unique : true
    }
})

const tagModel : Model<tagsType> = mongoose.model('tags', tagSchema);
export default tagModel;