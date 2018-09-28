import React from "react";

 const ExerciseItem = props => (
  
  <ul className="list-group">
        <button className="btn btn-primary" onClick={() => props.deleteExercise(props.id)}>
        Remove
        </button>
        <li className="list-group-item" id={props.id}>
          <strong>{props.name}</strong> 
        </li>
      </ul>
      
);

export default ExerciseItem;