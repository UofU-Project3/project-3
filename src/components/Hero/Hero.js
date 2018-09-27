import React from "react";
import "./Hero.css";

const Hero = props => (
  <div className="hero text-center">
    {props.children}
  </div>
);

export default Hero;
