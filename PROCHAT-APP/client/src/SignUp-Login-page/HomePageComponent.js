import logo from "../images/logo1.png";
import phone from "../images/phone.png";
import banner from "../images/banner3.png";
import video from "../videos/video.mp4";
import { Link } from "react-router-dom";

const HomePageComponent = () => {
  return (
    <>
      <div>
        <div className="flex justify-between">
          <img className="w-72 -mt-24" src={logo} alt="logo"></img>

          <div className="mr-12 mt-8">
            <button className="mr-10 text-xl font-bold hover:text-[#231FE6]">
              <Link to="/login">Login</Link>
            </button>
            <button className=" text-xl font-bold hover:text-[#231FE6]">
             <Link to="/SignUp">SignUp</Link>
            </button>
          </div>
        </div>

        <div className="">
          <div className="float-left w-1/2 ml-28 mt-10">
            <h1 className="font-bold text-8xl">Message</h1>
            <h1 className="font-bold text-8xl mt-3 text-[#231FE6]">
              Privately
            </h1>
            <p className="mt-5 text-2xl">
              Simple, reliable, private messaging, available all over the world.
            </p>

            <button className="text-white bg-black border border-black w-56 rounded-2xl p-3 font-bold mt-10 text-xl hover:bg-[#231FE6]">
             <Link to="/login"> Get Started</Link>
            </button>
          </div>

          <div className="float-right w-1/3">
            <img className=" -mt-32" src={phone} alt="phoneImage"></img>
          </div>
        </div>

        <div className="mt-[580px] text-center">
          <h1 className="font-bold text-7xl mt-3">
            Speak{" "}
            <span className="font-bold text-7xl ml-1 text-[#231FE6]">
              freely
            </span>
          </h1>
          <h3 className="text-2xl mt-7 ml-52 mr-52">
            With end-to-end encryption, your personal messages and calls are
            secured. Only you and the person you're talking to can read or
            listen to them, and nobody in between, not even{" "}
            <span className="ml-0 font-bold">ProChat</span>.
          </h3>

          <div>
            <img className="mt-20 p-10" src={banner} alt=""></img>
          </div>
        </div>

        <div className="mt-52 p-0">
          <div className="float-left w-1/3 ml-28 mt-10">
            <h1 className="font-bold text-6xl">Keep in touch </h1>

            <h1 className="font-bold text-6xl mt-3">
              with your
              <span className="ml-3 text-6xl text-[#231FE6] font-bold">
                groups
              </span>
            </h1>

            <h3 className="text-xl mt-6">
              Whether it's planning an outing with friends or simply staying on
              top of your family chats, group conversations should feel
              effortless.
            </h3>
          </div>

          <div className="float-right w-1/2 ">
            <video className="w-11/12" src={video} muted autoPlay loop></video>
          </div>
        </div>

        <div className=" mt-[700px]"></div>
      </div>
    </>
  );
};

export default HomePageComponent;
