import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import "./ColorPicker.scss";
import Card from "@material-ui/core/Card";
import ListColor from "./ListColor";

let newArr = [];

const ColorPicker = () => {
  const [open, setOpen] = useState(false);
  const [colorR, setColorR] = useState(10);
  const [colorG, setColorG] = useState(150);
  const [colorB, setColorB] = useState(100);
  const [hex, setHex] = useState("#0a9664");
  const [input, setInput] = useState("#000000");

  let col = `rgb(${colorR}, ${colorG}, ${colorB})`;
  useEffect(() => {
    const newCols = rgbToHex(col);
    setInput(newCols);
  }, [col]);

  let rgbToHex = (x) =>
    "#" +
    x
      .match(/\d+/g)
      .map((z) => (+z < 16 ? "0" : "") + (+z).toString(16))
      .join("");

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const toggle = () => {
    setOpen(!open);
    if (!open) {
      let arr = [colorR, colorG, colorB];
      newArr = [...arr];
    }
  };
  let menuRef = useRef();
  useEffect(() => {
    const closeMenu = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(open);
      }
    };
    document.addEventListener("mousedown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  });
  const cancelColor = () => {
    setColorR(newArr[0]);
    setColorG(newArr[1]);
    setColorB(newArr[2]);
    let oldColor = hex;
    setInput(oldColor);
    setOpen(!open);
  };
  const addColor = () => {
    let newCol = rgbToHex(col);
    setHex(newCol);
    setOpen(!open);
  };
  const addColorInput = (e) => {
    setHex(e.target.value);
    setInput(e.target.value);
  };
  const setStaticColor = (col) => {
    setHex(col);
    setInput(col);
    convertColor(col);
  };
  function convertColor(color) {
    if (color.substring(0, 1) === "#") {
      color = color.substring(1);
    }
    let rColor = parseInt(color.substring(0, 2), 16);
    let gColor = parseInt(color.substring(2, 4), 16);
    let bColor = parseInt(color.substring(4), 16);
    setColorR(rColor);
    setColorG(gColor);
    setColorB(bColor);
  }
  return (
    <div className='container'>
      <Card className='container__card'>
        <div className='select'>
          <label className='text__label' htmlFor=''>
            <input
              className='colorInput'
              onChange={addColorInput}
              value={hex}
              type='text'
              placeholder='#ffffff'
            />
          </label>

          <div ref={menuRef} className='color__rgb-container'>
            <label onClick={toggle} className='color__label' htmlFor=''>
              <input value={input} onChange={handleChange} type='color' />
            </label>
            <div className={`box__range ${open && "open__range"}`}>
              <label htmlFor=''>R</label>
              <input
                onChange={(e) => setColorR(e.target.value)}
                value={colorR}
                type='range'
                min={0}
                max={255}
                id='red'
              />
              <label htmlFor=''>G</label>
              <input
                onChange={(e) => setColorG(e.target.value)}
                type='range'
                min={0}
                max={255}
                value={colorG}
                id='green'
              />
              <label htmlFor=''>B</label>
              <input
                onChange={(e) => setColorB(e.target.value)}
                min={0}
                max={255}
                value={colorB}
                type='range'
                id='blue'
              />
              <div className='buttons__container'>
                <Button
                  onClick={cancelColor}
                  variant='contained'
                  color='primary'
                  disableElevation
                >
                  cancel
                </Button>
                <Button
                  onClick={addColor}
                  variant='contained'
                  color='primary'
                  disableElevation
                >
                  ok
                </Button>
              </div>
            </div>
          </div>

          <ListColor setStaticColor={setStaticColor} />
        </div>
      </Card>
    </div>
  );
};
export default ColorPicker;
