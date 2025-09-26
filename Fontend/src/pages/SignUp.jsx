import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import logo from "../assets/playtube.jpg";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from 'axios';
const SignUp = () => {
  const [page, setpage] = useState(1);
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [showpass, setshowpass] = useState(false);
  const [fontImage, setfontImage] = useState(null);
  const [backendImage, setbackendImage] = useState(null);
  const navigate = useNavigate();

  const handelar = (e) => {
    const file = e.target.files[0];
    setbackendImage(file);
    setfontImage(URL.createObjectURL(file));
  };

  const handelNext = () => {
    if (page === 1) {
      if (!userName) {
        toast.error("User name required");
        return;
      }
      if (!email) {
        toast.error("Email required");
        return;
      }
    }
    if (page === 2) {
      if (!password) {
        toast.error("password required");
        return;
      }
      if (!confirmPassword) {
        toast.error("Confirm Password required");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Password is not match");
        return;
      }
    }
    setpage(page + 1);
  };

  const handelBack = () => {
    if (page > 1) {
      setpage(page - 1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-black h-screen w-screen text-white flex justify-center items-center">
      <div className="h-auto bg-gray-800 w-auto p-5 rounded-2xl flex flex-col gap-4">
        <div className="flex items-center gap-4 cursor-pointer" onClick={handelBack}>
          <FaArrowLeft />
          <p className="text-2xl">Create Account</p>
        </div>
        {page === 1 && (
          <>
            <div className="flex items-center gap-4">
              <img src={logo} alt="" className="h-8 w-8 rounded-4xl" />
              <p className="text-2xl font-extrabold">Basic Info</p>
            </div>

            <input
              type="text"
              placeholder="UserName"
              className="outline w-full p-2 rounded text-white focus:outline-orange-500"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Email"
              className="outline w-full p-2 rounded text-white focus:outline-orange-500"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
            <button
              className="bg-orange-400 w-25 p-2 rounded-4xl ml-45 mt-4 cursor-pointer hover:bg-amber-700"
              onClick={handelNext}
            >
              Next
            </button>
          </>
        )}
        {page === 2 && (
          <>
            <div className="flex items-center gap-4">
              <img src={logo} alt="" className="h-8 w-8 rounded-4xl" />
              <p className="text-2xl font-extrabold">Security</p>
            </div>
            <div className="flex items-center gap-2 bg-gray-600 p-2 rounded-4xl">
              <CgProfile className="w-8 h-8" />
              <p>{email}</p>
            </div>
            <input
              type={showpass ? "text" : "password"}
              placeholder="Password"
              className="outline w-full p-2 rounded text-white focus:outline-orange-500"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
            <input
              type={showpass ? "text" : "password"}
              placeholder="Confirm password"
              className="outline w-full p-2 rounded text-white focus:outline-orange-500"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              required
            />
            <div>
              <input
                type="checkbox"
                name="showpass"
                id="showpass"
                checked={showpass}
                onChange={() => setshowpass(!showpass)}
              />
              <label htmlFor="showpass" className="text-gray-100 ml-2 font-bold">
                Show Password
              </label>
            </div>
            <button
              className="bg-orange-400 w-25 p-2 rounded-4xl ml-45 mt-4 cursor-pointer hover:bg-amber-700"
              onClick={handelNext}
            >
              Next
            </button>
          </>
        )}
        {page === 3 && (
          <>
            <div className="flex items-center gap-4">
              <img src={logo} alt="" className="h-8 w-8 rounded-4xl" />
              <p className="text-2xl font-extrabold">Choose Avatar</p>
            </div>
            <div className="flex  items-center gap-1">
              <div>
                {fontImage ? (
                  <img src={fontImage} alt="profileimage" />
                ) : (
                  <CgProfile className="h-22 w-22" />
                )}
              </div>
              <div className="flex flex-col w-58 p-2 gap-2">
                <b>Choose Profile Picture</b>
                <input
                  type="file"
                  className="bg-orange-400 p-2 rounded-2xl"
                  onChange={handelar}
                />
              </div>
            </div>
            <button className="bg-green-400 w-40 p-2 rounded-4xl ml-35 mt-4 cursor-pointer hover:bg-amber-700">
              Create Account
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
