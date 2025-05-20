import mongoose , {Schema , Model , Types, ObjectId}  from "mongoose";
const {ObjectId} = Schema.Types;

interface ContentType {
    contentType: string;
    link: string;
    title: string;
    tags: Types.ObjectId[];
    userId: Types.ObjectId; 
    created_at : Date
}

// const contentTypes = ['image', 'video', 'article', 'audio' , 'post']; // Extend as needed
    const contentTypes = ['image' , 'youtube' , 'twitter'];

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
    userId : {type : ObjectId , ref: 'users', required : true},
    created_at : {type: Date, required: true, default: Date.now}
})

const contentModel : Model<ContentType> = mongoose.model('content' , noteSchema);
export default contentModel;