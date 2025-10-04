import React, { useState } from "react";
import logo from "../assets/playtube.jpg";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";
import { backendUrl } from "../App";
import { ClipLoader } from "react-spinners";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
const SignIn = () => {
  const [page, setpage] = useState(1);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showpass, setshowpass] = useState(false);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const handelNext = () => {
    if (page === 1) {
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
  const handelSignIn = async () => {
    setloading(true);

    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("SignIn Successfully");
        navigate("/");
      }
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-black h-screen w-screen text-white flex justify-center items-center">
      <div className="h-auto bg-gray-800 w-auto p-5 rounded-2xl flex flex-col gap-4">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={handelBack}
        >
          <FaArrowLeft />
          <p className="text-2xl">PlayTube</p>
        </div>
        {page === 1 && (
          <>
            <div className="flex items-center gap-4 min-w-70">
              <img src={logo} alt="" className="h-8 w-8 rounded-full" />
              <p className="text-2xl font-extrabold">Signin</p>
            </div>
            <p>With your Account to continue to Playtube.</p>

            <input
              type="text"
              placeholder="Email"
              className="outline w-full p-2 rounded text-white focus:outline-orange-500"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
            <div>
              <button>
                <Link className="text-orange-400 " to="/signup">
                  Create new Account
                </Link>
              </button>
              <button
                className="bg-orange-400 w-32 p-2 rounded-full ml-30 mt-4 cursor-pointer hover:bg-amber-700"
                onClick={handelNext}
              >
                Next
              </button>
            </div>
          </>
        )}
        {page === 2 && (
          <>
            <div className="flex items-center gap-4">
              <img src={logo} alt="" className="h-8 w-8 rounded-4xl" />
              <p className="text-2xl font-extrabold">Welcome</p>
            </div>
            <div className="flex items-center gap-2 bg-gray-600 p-2 rounded-full">
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
            <div>
              <input
                type="checkbox"
                name="showpass"
                id="showpass"
                checked={showpass}
                onChange={() => setshowpass(!showpass)}
              />
              <label
                htmlFor="showpass"
                className="text-gray-100 ml-2 font-bold"
              >
                Show Password
              </label>
            </div>
            <div>
              <button>
                <Link className="text-orange-400 " to="/">
                  Forgot Password?
                </Link>
              </button>
              <button
                className="bg-orange-400 w-25 p-2 rounded-4xl ml-45 mt-4 cursor-pointer hover:bg-amber-700"
                onClick={handelSignIn}
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader className="text-black size-20" />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignIn;
