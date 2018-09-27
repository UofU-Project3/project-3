import React from "react";
export const ListItem = props => (

  <div className="card">
  <div className="card-header">
   {props.Name}
  </div>
  <ul className="list-group">
        
        <li className="list-group-item">
          <strong>Name:</strong> {props.Main_Muscle_Group}
        </li>
        <li className="list-group-item">
          <strong>Type:</strong> {props.Type}
        </li>
        <li className="list-group-item">
          <strong>Difficulty: </strong>{props.Difficulty}
          
        </li>
      </ul>
      </div>
);

