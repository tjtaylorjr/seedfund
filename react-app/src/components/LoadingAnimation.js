import React, {useEffect} from "react";
import { motion } from "framer-motion";

const spinnerAnimation = {
  repeat: Infinity,
  repeatType: "loop",
  duration: 1,
  ease: "linear"
};

const LoadingAnimation = (props) => {
  let height = "";
  let top = "";
  let left = "";
  let spinWidth = "";
  let spinHeight = "";
  let borderWidth = "";

  if(props.size === "LRG") {
    height = "362px";
    top = "12.5rem";
    left = "25.5rem";
    spinWidth = "12rem";
    spinHeight = "12rem";
    borderWidth = "2rem";
  }

  if (props.size === "MED-SML") {
    height = "139.5px";
    top = "50px";
    left = "105px";
    spinWidth = "4rem";
    spinHeight = "4rem";
    borderWidth = ".75rem";
  }

  if (props.size === "MED") {
    height = "210px";
    top = "75px";
    left = "146px";
    spinWidth = "6rem";
    spinHeight = "6rem";
    borderWidth = "1rem";
  }

  if (props.size === "SML") {
    height = "90px";
    top = "30px";
    left = "60.5px";
    spinWidth = "3rem";
    spinHeight = "3rem";
    borderWidth = ".5rem";
  }

  return (
    <div className="spinnerContainer" style={{height: height}} >
      <motion.span className="spinner"
        style={{top: top, left: left, height: spinHeight, width: spinWidth, borderWidth: borderWidth}}
        animate={{ rotate: 360}}
        transition={spinnerAnimation}
        />
    </div>
  );
};

export default LoadingAnimation;
