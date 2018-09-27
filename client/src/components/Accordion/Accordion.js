import React from 'react';

const ExerciseType = (props, children) => (
 <li>
   <a  data-toggle="collapse" href={"#"+props.id} role="button" aria-expanded="false" aria-controls={props.id}>
   {props.group}
  </a>
  <div className="collapse" id={props.id}>
        <div className="card card-body">
            <ul>   
              {props.children}
            </ul>
        </div>
    </div>
</li>           
          
        
);
export default ExerciseType;