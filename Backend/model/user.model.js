import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    booksBought: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book", // Reference to the Book schema
        },
    ],
    balance:{
        type:Number,
        default:1000
    }
});
const User = mongoose.model("User", userSchema);
export default User;