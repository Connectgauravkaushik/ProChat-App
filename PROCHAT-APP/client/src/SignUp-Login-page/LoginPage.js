import logo from "../images/logo1.png";
import sideimage from "../images/loginPageImage.png";
import banner from "../images/banner1.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showLoginUser } from "../utils/userSlice";

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const submitHandler = () => {
    if (!email || !password) {
      toast.error("Fill all the Details!", {
        position: "top-left",
      });
    } else {
      try {
        fetch("/api/user/login", {
          method: "post",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => dispatch( showLoginUser( data ) ));
          
        toast.success("Success Notification !", {
          position: "top-left",
        });

        setTimeout(() => {
          navigate("/chat");
        }, 2000);
      } catch (error) {
        alert("ERROR WHILE UPLOADING!!");
      }
    }
  };

  return (
    <>
      <div className="w-full h-full">
        <div className="w-[61%] float-right">
          <img className="w-[61%] float-right" src={banner} alt=""></img>
        </div>
        <div className="w-1/2 float-left  -mt-4 ">
          <div>
            <img className="w-80 ml-24 -mt-20" src={logo} alt=""></img>
          </div>
          <div>
            <h1 className="ml-36 text-6xl font-bold -mt-12">Welcome back!!</h1>
            <p className="ml-36 mt-6 text-lg">
              Start your converstation in seconds. Don’t have an account?
              <span className="text-[#231FE6] font-bold cursor-pointer">
                <Link to="/SignUp">Sign Up.</Link>
              </span>
            </p>
          </div>
          <div className="ml-36 mt-5">
            <form onSubmit={(e) => e.preventDefault()}>
              <label className="font-semibold">Email</label>
              <br />
              <input
                className="w-96"
                type="text"
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
              <br />
              <button
                className="w-96 border border-[#231FE6] bg-[#231FE6] text-white text-xl p-2 "
                onClick={submitHandler}
              >
                Login
              </button>
            </form>
          </div>
        </div>

        <div className="w-1/3 float-right mr-20  mt-5">
          <img className="mr-20" src={sideimage} alt=""></img>
        </div>
      </div>

      <ToastContainer autoClose={1000} />
    </>
  );
};

export default LoginPage;
