import React, { useRef, useState, useEffect } from "react";
import "./monitor.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Monitor = () => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const [vstream, setVstream] = useState(null);
  const [stopStream, setStopStream] = useState(0);
  const [folder, setFolder] = useState("");
  const [idValue, setIdValue] = useState(0);
  const [disable, setDisable] = useState(1);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const folderRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const capture = async () => {
    setIdValue(idValue + 1);
    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    // setImageSrc(canvasRef.current.toDataURL("image/webp", 0.6));
    // console.log(
    //   "Image Data: ",
    //   canvasRef.current.toDataURL("image/webp", 0.6).split(",")[1]
    // );
    try {
      await axios.post("http://127.0.0.1:5000/capture", {
        id: idValue,
        folder_name: folder,
        image: canvasRef.current.toDataURL("image/jpeg", 0.7).split(",")[1],
      });
      toast.success(`Saved ${folder}-${idValue} in ${folder}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log("captureError: ", error);
      let errorValue = error.response.data.error;
      toast.error(`Error: ${errorValue}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (idValue === 5) {
      toggleModal();
    }
  };
  const handleRedirect = () => {
    if (redirectTo) {
      navigate(redirectTo);
    }
  };
  const startVideo = async () => {
    setDisable(0);
    setStopStream(!stopStream);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      setVstream(stream);
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    } catch (err) {
      console.error(err);
    }
  };
  const endVideo = async () => {
    setDisable(1);
    videoRef.current.srcObject = null;
    videoRef.current.pause();
    setStopStream(!stopStream);
    vstream.getTracks().forEach((track) => track.stop());
    setVstream(null);
  };

  const createFolder = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/register", {
        folder_name: folder,
      });

      folderRef.current.value = "";
      toast.success(`Created ${folder} folder`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log("Error creating folder: ", error);
      let errorValue = error.response.data.error;
      toast.error(`Error: ${errorValue}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      folderRef.current.value = "";
    }
  };
  const handleFolder = (e) => {
    setFolder(e.target.value);
  };
  
  return (
    <div className="monitor_wrapper flex flex-col h-[100%] w-[100%]">
    {isModalOpen && (
        <div className="custom-modal">
          <div className="custom-modal-content">
            <p className="text-lg font-bold">Successful!</p>
            <div className="flex gap-10 pt-10">
              <button
                className="confirm-button"
                onClick={() => {
                  setRedirectTo("/dashboard/home");
                  handleRedirect();
                }}
              >
                HomePage
              </button>
              <button className="confirm-button" onClick={toggleModal}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
      <div className="flex flex-row justify-between mt-20 monitor_section">
        <div className="folderName">
          <label className="folderNameLabel" htmlFor="folderName">
            Folder Name
          </label>
          <input
            ref={folderRef}
            onChange={(e) => {
              handleFolder(e);
            }}
            className="outline-[#5d6a77] mt-4 w-full folderNameInput"
            type="text"
            id="folderName"
          />
          <label className="folderNameLabel" htmlFor="folderName">
            Name
          </label>
          <input
            ref={folderRef}
            onChange={(e) => {
              handleFolder(e);
            }}
            className="outline-[#5d6a77] mt-4 w-full folderNameInput"
            type="text"
            id="folderName"
          />
          <label className="folderNameLabel" htmlFor="folderName">
            Role
          </label>
          <input
            ref={folderRef}
            onChange={(e) => {
              handleFolder(e);
            }}
            className="outline-[#5d6a77] mt-4 w-full folderNameInput"
            type="text"
            id="folderName"
          />
          <label className="folderNameLabel" htmlFor="folderName">
            Unit
          </label>
          <input
            ref={folderRef}
            onChange={(e) => {
              handleFolder(e);
            }}
            className="outline-[#5d6a77] mt-4 w-full folderNameInput"
            type="text"
            id="folderName"
          />
          <label className="folderNameLabel" htmlFor="folderName">
            Resumption Date
          </label>
          <input
            ref={folderRef}
            onChange={(e) => {
              handleFolder(e);
            }}
            className="outline-[#5d6a77] mt-4 w-full folderNameInput"
            type="text"
            id="folderName"
          />
          <button
            onClick={createFolder}
            className="w-full mt-6 folderNameButton"
          >
            Register
          </button>
        </div>
        <div className="capture">
          <div className="flex flex-col items-center justify-center preview">
            <video ref={videoRef} className="w-full rounded-[8px]" />
          </div>
          <div className="capture_button_wrapper ">
            <button
              disabled={disable}
              onClick={capture}
              // onClick={toggleModal}
              className="capture_button1"
            >
              Capture
            </button>
            <button
              onClick={stopStream ? endVideo : startVideo}
              className="capture_button2"
            >
              {stopStream ? "Stop Preview" : "Start Preview"}
            </button>
          </div>
        </div>
      </div>
      <div className="hidden">
        <canvas ref={canvasRef} width="640" height="480" />
      </div>
    </div>
  );
};
export default Monitor;
