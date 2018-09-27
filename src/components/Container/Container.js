import React from "react";
import "./Container.css"

const Container = props => {
  console.log(props);
  return(
  <div className={`container${props.fluid ? "-fluid" : ""}`} {...props} />);
}
export default Container;
