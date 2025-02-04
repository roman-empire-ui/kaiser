import mongoose from "mongoose";



const convSchema = new mongoose.Schema({

    participants : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ] ,

    messages : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Messages',
            default : []
        },
    ],
}, {timestamps: true})

const Conversation = mongoose.model('Conversation', convSchema); 

export default Conversation;