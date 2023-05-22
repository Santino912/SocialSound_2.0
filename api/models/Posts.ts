import { model, Schema } from "mongoose";

const post = new Schema({
    title: {
        type: String,
        require: true
    },
    type: {
        type: String,
        enum: ["video", "audio"]
    },
    postDate: {
        type: Date,
        default: Date.now()
    },
    postDateNumber: {
        type: Number,
        default: Date.now()
    },
    user: {
        ref: "Users",
        type: Schema.Types.Mixed
    },
    genres: {
        type: Array,
        require: true
    },

    cover: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/socialsound-5f98d.appspot.com/o/cover%2Flogoiconbg.png0.11681404598094702?alt=media&token=dc1af278-0c16-486a-a20e-2096771727f8"
    },
    duration: String,
    content: String,
    description: String
});
export default model("Post", post);