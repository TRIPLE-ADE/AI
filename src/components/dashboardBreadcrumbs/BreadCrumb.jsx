import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import "./breadCrumb.scss";
import { MdOutlineMenu } from "react-icons/md";
const BreadCrumb = ({ currentLink, setSidebar, sidebar }) => {
  return (
    <div className="flex flex-row items-center bread_crumb">
      <MdOutlineMenu
        className="dash_hamburger cursor-pointer text-[black]"
        onClick={() => {
          setSidebar(!sidebar);
        }}
      />
      <div className="Bread_links flex items-center font-[inter] ">
        <Link to="/dashboard/home" className="link1">
          <p className="link_item1">Dashboard</p>
        </Link>
        <IoIosArrowForward className="mx-2 text-[20px]" />
        <Link to={""} className="link1">
          <p className="link_item1">{`${currentLink
            .charAt(0)
            .toUpperCase()}${currentLink.slice(1)}`}</p>
        </Link>
      </div>
    </div>
  );
};

export default BreadCrumb;
