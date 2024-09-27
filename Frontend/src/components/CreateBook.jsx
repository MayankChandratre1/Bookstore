import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
function CreateBook() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const user = await JSON.parse(localStorage.getItem("Users") || "")
    if(!user){
      toast.error("Error: Invalid Author");
      return 
    }
    const uid = user._id
    const uname = user.fullname
    const bookInfo = {
      title: data.title,
      price: data.price,
      category: data.category,
      image: "https://res.cloudinary.com/dvsl1aslo/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1723482023/samples/cup-on-a-table.jpg",
      author: uname,
      authorId: uid
    };
    await axios
      .post("http://localhost:4001/book", bookInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Book Added Successfully");
          navigate(from, { replace: true });
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className=" w-[600px] ">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Create Book</h3>
              <div className="mt-4 space-y-2">
                <span>Title</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter Title"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("title", { required: true })}
                />
                <br />
                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Email */}
              <div className="mt-4 space-y-2">
                <span>Price</span>
                <br />
                <input
                  type="number"
                  placeholder="Enter Price"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("price", { required: true })}
                />
                <br />
                {errors.price && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Password */}
              <div className="mt-4 space-y-2">
                <span>Category</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your category"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("category", { required: true })}
                />
                <br />
                {errors.category && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Button */}
              <div className="flex justify-around mt-4">
                <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateBook;
