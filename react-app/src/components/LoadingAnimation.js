import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const spinnerAnimation = {
  repeat: 2,
  repeatType: "loop",
  duration: 1.25,
  ease: "linear"
};

const LoadingAnimation = (props) => {

  const containerRef = useRef();
  const animationRef = useRef();

  const containerStyle = `spinnerContainer--${props.size}`;
  const animationStyle = `spinner--${props.size}`

  useEffect(() => {
    containerRef.current.classList.add(containerStyle);
    animationRef.current.classList.add(animationStyle);
  }, [])

  return (
    <div className="spinnerContainer" ref={containerRef}>
      <motion.span className="spinner"
        ref={animationRef}
        animate={{ rotate: 360}}
        transition={spinnerAnimation}
        />
    </div>
  );
};

export default LoadingAnimation;
