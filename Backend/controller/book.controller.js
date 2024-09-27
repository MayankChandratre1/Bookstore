import Book from "../model/book.model.js";
import User from "../model/user.model.js";

export const getBook = async(req, res) => {
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};
export const getMyBooks = async(req, res) => {
    try {
        const book = await Book.find({
            authorId: req.body.authorId
        });
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};
export const getBoughtBooks = async(req, res) => {
    const {userId} = req.body
    try {
        const user = await User.findById(userId)
             .populate('booksBought')  // Populating the books array with actual book documents
             .exec()

        console.log(user.booksBought);
        return res.status(200).json({
            books: user.booksBought
        })
            
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

export const createBook = async(req, res) => {
    const data = req.body
    console.log(data);
    
    try {
        const book = await Book.create({
            name: data.name,
            price: data.price,
            image: data.image,
            title: data.title,
            category: data.category,
            author: data.author,
            authorId: data.authorId
        })

        res.status(200).json({
            message: "created book"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Error",
            err
        })
    }
}

export const buyBook = async (req, res) => {
    const { userId, bookId } = req.body; 
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        
        const alreadyBought = user.booksBought.includes(bookId);
        if (alreadyBought) {
            return res.status(400).json({ message: "Book already purchased" });
        }

    
        user.booksBought.push(bookId);

        
        await user.save();

        
        return res.status(200).json({ message: "Book purchased successfully", user });
    } catch (error) {
        
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const deletebook = async (req, res) => {
    const { bookId } = req.body; 
    
    try {
        await Book.deleteOne({
            _id: bookId
        })
        return res.status(200).json({ message: "Book purchased successfully" });
    } catch (error) {
        
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};