import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FiMonitor } from "react-icons/fi";
import { BsInfoCircle } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import Logo from "../../assets/logo.png";
import { CgDatabase } from "react-icons/cg";
import { MdOutlineMenu } from "react-icons/md";
import { RiRadioButtonLine } from "react-icons/ri";
import "./dash.scss";
import { useState } from "react";
import BreadCrumb from "../../components/dashboardBreadcrumbs/BreadCrumb";

function Dashboard({ siginOUt }) {
  const [sidebar, setSidebar] = useState(0);
  const path = useLocation().pathname;
  return (
    <div className="h-full dash_wrapper">
      <div className="flex items-start h-full dash_container">
        <div
          className={`bg-[#2D8490] h-full dash_sidebar ${
            sidebar ? "dash_sidebarOpen" : "dash_sidebarClose"
          }`}
        >
        {/* <div
          className={`bg-[#5d6a77] h-full dash_sidebar ${
            sidebar ? "dash_sidebarOpen" : "dash_sidebarClose"
          }`}
        > */}
          <div className="flex flex-col items-center mt-10">
            <img src={Logo} alt="AEIRG LOGO" className="px-10 mb-2" />
            {/* <h1 className="mb-10 font-[inter] text-[20px] text-[white] font-semibold">
              IS4RM
            </h1> */}
          </div>

          <div>
            {/* <Link
              to="/dashboard/test1"
              className="hover:text-[#001A35] flex items-center text-[white] ml-6"
            >*/}
            <Link
              to="/dashboard/home"
              className="hover:text-[#760096] flex items-center text-[white] ml-6"
            >
              <div
                className={`flex items-center  ${
                  path.includes("home")
                    ? "border-r-8 border-r-[#760096] text-[#760096]"
                    : ""
                } w-full py-3`}
              >
                <RiRadioButtonLine className="text-[24px]" />
                <p className="text-[15px] font-[inter] font-semibold ml-2">
                  Home
                </p>
              </div>
            </Link>
            <Link
              to="/dashboard/staff-registration"
              className="hover:text-[#760096] flex items-center text-[white] ml-6"
            >
              <div
                className={`flex items-center ${
                  path.includes("staff-registration")
                    ? "border-r-8 border-r-[#760096] text-[#760096]"
                    : ""
                } w-full py-3`}
              >
                <RiRadioButtonLine className="text-[24px]" />
                <p className="text-[15px] font-[inter] font-semibold ml-2">
                 Staff Registration
                </p>
              </div>
            </Link>
            <Link
              to="/dashboard/live-security-control"
              className="hover:text-[#760096] flex items-center text-[white] ml-6"
            >
              <div
                className={`flex items-center ${
                  path.includes("live-security-control")
                    ? "border-r-8 border-r-[#760096] text-[#760096]"
                    : ""
                } w-full py-3`}
              >
                <RiRadioButtonLine className="text-[24px]" />
                <p className="text-[15px] font-[inter] font-semibold ml-2">
                  Live Security Control
                </p>
              </div>
            </Link>
            <Link
              to="/dashboard/history"
              className="hover:text-[#760096] flex items-center text-[white] ml-6"
            >
              <div
                className={`flex items-center ${
                  path.includes("history")
                    ? "border-r-8 border-r-[#760096] text-[#760096]"
                    : ""
                } w-full py-3`}
              >
                <RiRadioButtonLine className="text-[24px]" />
                <p className="text-[15px] font-[inter] font-semibold ml-2">
                History
                </p>
              </div>
            </Link>
            <div
              onClick={() => {
                siginOUt();
              }}
              className="hover:text-[#760096] flex items-center text-[white] ml-6 cursor-pointer"
            >
              <div className="flex items-center w-full py-3">
                <TbLogout className="text-[24px]" />
                <p className="text-[15px] font-[inter] font-semibold ml-2">
                  Logout
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            setSidebar(!sidebar);
          }}
          className={`dash_overlay ${
            sidebar ? "dash_overlayOpen" : "dash_overlayClose"
          }`}
        ></div>
        <div className="w-screen h-full overflow-x-hidden outlet-body outlet-media dash_outlet">
          {/* <MdOutlineMenu
            className="dash_hamburger cursor-pointer text-[black] mb-4"
            onClick={() => {
              setSidebar(!sidebar);
            }}
          /> */}
          <BreadCrumb
            currentLink={path.split("/dashboard/")[1]}
            setSidebar={setSidebar}
            sidebar={sidebar}
          />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// <div className="outlet-body pl-52 md:pl-64 lg:pl-[24rem] xl:pl-[29rem] w-screen h-screen outlet-media">
//   <Outlet />
// </div>;
