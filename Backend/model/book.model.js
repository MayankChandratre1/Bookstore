import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    title: String,
    author:{
        type:String,
        default:"Anonymus"
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});
const Book = mongoose.model("Book", bookSchema);

export default Book;