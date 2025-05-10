import mongoose , {Schema , Model}  from "mongoose";

interface tagsType {
    title : string
}

const tagSchema : Schema<tagsType> = new Schema({
    title : {
        type : String,
        required : true,
        unique : true
    }
})

const TagModel : Model<tagsType> = mongoose.model('Tags', tagSchema);
module.exports = TagModel;