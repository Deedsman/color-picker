import React, { useState, useRef, useEffect } from "react";
import "./ListColor.scss";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useClickOutside = (handler) => {
  const domNode = useRef();
  useEffect(() => {
    const closeMenu = (e) => {
      if (!domNode.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  });

  return domNode;
};

export default function ListColor({ setStaticColor }) {
  const [open, setOpen] = useState(false);
  const colors = [
    { name: "red", color: "#ff0000" },
    { name: "green", color: "#008000" },
    { name: "green", color: "#0000ff" },
    { name: "yellow", color: "#ffff00" },
  ];

  const addStaticColor = (e) => {
    setStaticColor(e.currentTarget.dataset.color);
  };
  const toggleStaticMenu = (e) => {
    setOpen(!open);
  };
  let domNode = useClickOutside(() => {
    setOpen(false);
  });
  return (
    <>
      <div
        ref={domNode}
        onClick={toggleStaticMenu}
        className='select-static__color'
      >
        <ArrowDropDownIcon />
        <div className={`static__menu ${open && "static__menu-open"}`}>
          {colors.map((col, id) => (
            <div
              data-color={col.color}
              onClick={addStaticColor}
              key={id}
              className='static__item'
            >
              <p className='static__name'>{col.name}</p>
              <span
                className='static__color'
                style={{ background: col.color }}
              ></span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
