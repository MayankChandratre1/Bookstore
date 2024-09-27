import React, { useEffect, useState } from 'react'
import Course from './Course'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import Cards from './Cards'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const MyShelf = () => {
    const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
    const user = await JSON.parse(localStorage.getItem("Users") || "")
    if(!user){
      toast.error("Error: Invalid Author");
      return 
    }
    const uid = user._id
      try {
        const res = await axios.post("http://localhost:4001/book/boughtbooks",{
            userId: uid
        });
        console.log("Hello "+res.data);
        setBook(res.data.books);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);
  return (
    <>
    <Navbar />
    <div className=" min-h-screen">
        <div className='mt-12 px-4'>
        <Link to="/course">
            <button className="mt-8 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300 mx-2">
                Explore Books
            </button>
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4">
          {book.map((item) => (
            <Cards broughtBook key={item.id} item={item} />
          ))}
        </div>
          
    </div>
    <Footer />
  </>
  )
}

export default MyShelf