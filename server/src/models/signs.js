import mongoose from "mongoose";

const signSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    imageColor: {
        type: [Number],
        required: true
    },
    imageText: {
        type: String,
        default: null
    },
    pHash: Buffer
});

export default mongoose.model("Sign", signSchema);
