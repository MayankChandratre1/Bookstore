import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Cards({ item, isMyBook }) {
  const buyNow = async () => {
    const user = localStorage.getItem("Users")
    const uid = await JSON.parse(user)
    const userId = uid._id 
    console.log(userId);
    const bookId = item._id
    await axios
      .post("http://localhost:4001/book/buybook", {userId, bookId})
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Book Bought Successfully");
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  }

  const deleteBook = async () => {
    const bookId = item._id
    console.log(bookId);
    
    await axios
      .post("http://localhost:4001/book/deletebook", {bookId})
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Book Deleted Successfully");
        }
        window.location.href = "/"
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  }
  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img src={item.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            
            {
              !isMyBook && <div className="badge badge-ghost">{item.author}</div>
            }

            <div className="card-actions justify-between">
              <div className="badge badge-outline">${item.price}</div>

              {
                !isMyBook && <button onClick={()=>{
                  buyNow()
                }} className=" cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
                  Buy Now
                </button>
              }
              
              {
                isMyBook && <button onClick={()=>{
                  deleteBook()
                }} className=" cursor-pointer px-2 py-1 rounded-full border-[2px] bg-red-500 text-white duration-200">
                  Remove
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
