import React, { useState, useEffect } from "react";
import "./about.scss";
import { BsFillPersonFill } from "react-icons/bs";
import { FcProcess } from "react-icons/fc";
import { MdFaceRetouchingOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../../assets/logo.png";
import "react-toastify/dist/ReactToastify.css";
const About = () => {
  const Navigate = useNavigate();
  const [train, setTrain] = useState(0);
  const handleTrainModel = async () => {
    setTrain(1);
    try {
      await axios.post("http://127.0.0.1:5000/train");
      toast.success(`Training Completed`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTrain(0);
    } catch (error) {
      setTrain(0);
      console.log("training: ", error);
      let errorValue = error.response.data.error;
      toast.error(`Error: ${errorValue}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <div className="flex flex-col h-full about_wrapper">
      <ToastContainer />
      <div className="flex flex-col items-center mt-10">
        <img src={Logo} alt="AEIRG LOGO" className="px-10 mb-2 w-96" />
      </div>
      <div className="test1_section1 mt-10 flex items-center justify-between mx-[1.5rem]">
        <div className="enroll flex flex-col items-center w-[30%]">
          <BsFillPersonFill className="text-[50px] text-[#760096]" />
          <p
            onClick={() => {
              Navigate("/dashboard/staff-registration");
            }}
            className="enroll_text mt-2 text-[#082a4d] cursor-pointer font-bold"
          >
            Enroll Face
          </p>
        </div>
        <div className="train flex flex-col items-center w-[30%]">
          <FcProcess className="text-[50px] text-[#760096]" />
          <p
            onClick={handleTrainModel}
            className="enroll_text mt-2 text-[#082a4d] cursor-pointer font-bold"
          >
            {train ? "...Training" : "Update Security Profile"}
          </p>
        </div>
        <div className="train flex flex-col items-center w-[30%]">
          <MdFaceRetouchingOff className="text-[50px] text-[#760096]" />
          <p
            onClick={() => {
              Navigate("/dashboard/live-security-control");
            }}
            className="enroll_text mt-2 text-[#082a4d] cursor-pointer font-bold"
          >
            Live Security Control
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
