import logo from "../images/logo1.png";
import sideimage from "../images/loginPageImage.png";
import banner from "../images/banner1.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
  const [fullname, setfullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picUpload, setPicUpload] = useState(true);

  const navigate = useNavigate();

  const uploadImage = (pics) => {
    if (pics === undefined) {
      setPicUpload(false);
    }
    console.log(pics);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      /*
        - FormData.append(name, value) — add a form field with the given name and value.Appending data to a form object without using html form tag.
        - an alternative of bundling data(object),and sending it to the server without using basic html form tag.
        - Think of it as a way to replicate what a html form does.
      */
      const data = new FormData();
      data.append("file", pics); // type is file and sending the image
      data.append("upload_preset", "chat-app"); // upload preset as key and pair name is chat-app
      data.append("cloud_name", "chat-apps"); // cloud Name
      fetch("https://api.cloudinary.com/v1_1/chat-apps/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setPicUpload(false);
    }
  };

  const submitHandler = async () => {
    if (!fullname || !email || !password) {
      toast.error("Fill all the Details!", {
        position: "top-left",
      });
    } else {
      try {
        fetch("/api/user/signUp", {
          method: "post",
          body: JSON.stringify({
            fullname,
            email,
            password,
            pic,
          }),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => console.log(data));

        toast.success("Success Notification !", {
          position: "top-left",
        });

        setTimeout(() => {
          navigate("/chat");
        }, 2000);
      } catch (error) {
        toast.info("user already present with this Email!!", {
          position: "top-left",
        });
      }
    }
  };

  return (
    <>
      <div>
        <div className="w-1/3 float-left mt-5">
          <img
            className="w-[96%] float-right mt-[15px]"
            src={banner}
            alt=""
          ></img>
          <img className="mr-20" src={sideimage} alt=""></img>
        </div>

        <div className="w-1/2 float-right  -mt-4 ">
          <div>
            <img className="w-80 ml-24 -mt-20" src={logo} alt=""></img>
          </div>
          <div>
            <h1 className="ml-36 text-6xl font-bold -mt-12">Welcome to</h1>
            <p className="ml-36 mt-6 text-lg">
              Start your converstation in seconds. Do you have an account?
              <span className="text-[#231FE6] font-bold cursor-pointer">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>
          <div className="ml-36 mt-5">
            <form onSubmit={(e) => e.preventDefault()}>
              <label className="font-semibold">Full Name</label>
              <br />
              <input
                className="w-96"
                type="text"
                onChange={(e) => setfullName(e.target.value)}
                placeholder="Enter full name"
              />
              <br />
              <br />
              <label className="font-semibold">Email</label>
              <br />
              <input
                className="w-96"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email Id"
              />
              <br />
              <br />
              <label className="font-semibold">Password</label>
              <br />
              <input
                className="w-96"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <br />
              <br />
              <label className="font-semibold">Add profile image</label>
              <br />
              <input
                className="w-96 border border-black"
                type="file"
                accept="image/*"
                onChange={(e) => uploadImage(e.target.files[0])}
              />
              <br />
              <br />
              <br />
              <button
                className="w-96 border border-[#231FE6] bg-[#231FE6] text-white text-xl p-2 "
                onClick={submitHandler}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default SignUpPage;
