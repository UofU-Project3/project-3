import React from "react";

 const FormBtn = props => (
 
  <button className="btn btn-success" onClick={() => props.saveWorkout()}>
  Submit
  </button>
);
export default FormBtn;