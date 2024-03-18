import React from "react";
import { IconContext } from "react-icons";
import { Link, useLocation } from "react-router-dom";
import "./SideBarButton.css";

export default function SideBarButton(props) {
  const location = useLocation();//ye hook as a location indicator kam krega 

  const isActive = location.pathname === props.to;

  const btnClass = isActive ? "btn-body active" : "btn-body";
  return (
    <Link to={props.to}>
      <div className={btnClass}>
        <IconContext.Provider value={{ size: "16px", className: "btn-icon" }}>
          {props.icon}
          <p className="btn-title">{props.title}</p>
        </IconContext.Provider>
      </div>
    </Link>
  );
}