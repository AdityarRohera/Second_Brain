import mongoose , {Schema , Model , Types, ObjectId}  from "mongoose";
const {ObjectId} = Schema.Types;

interface ContentType {
    contentType: string;
    link: string;
    title: string;
    tags: Types.ObjectId[];
    userId: Types.ObjectId; 
}

const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed

const noteSchema : Schema<ContentType> = new Schema({
    contentType : {
        type : String,
        enum : contentTypes,
        default : "article",
        required : true
    },
    link : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true,
        trim : true
    },
    tags : [
             {
                 type : ObjectId, ref: 'tags', required: true
             }
    ],
    userId : {type : ObjectId , ref: 'users', required : true}
})

const noteModel : Model<ContentType> = mongoose.model('Notes' , noteSchema);
export default noteModel;