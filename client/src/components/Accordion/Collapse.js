import React from "react";
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';




export default class CollapseItem extends React.Component {
    state = {
        popoverOpen: false
    };


    toggle = () => {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }
  
    //Need to make a way to keep only one popover active at a time
    render() {
        return (
            <div>

                <li onMouseOver={this.toggle} id={'Popover-' + this.props.id}>
                    <p id={this.props.id}>{this.props.name}</p>
                    <button className="btn btn-primary" onClick={() => this.props.saveExercise(this.props.data)}>
                        Add
                    </button>
           
                </li>

                <Popover placement="right-end" isOpen={this.state.popoverOpen} target={'Popover-' + this.props.id} toggle={this.toggle} data-trigger="hover">
                    <PopoverHeader>{this.props.name}</PopoverHeader>
                    <PopoverBody>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Detailed Muscle Group: {this.props.detailedMuscleGroup}</li>
                            <li className="list-group-item">Other Muscle Groups: {this.props.otherMuscleGroups}</li>
                            <li className="list-group-item">Equipment Needed: {this.props.equipment}</li>
                            <li className="list-group-item">Exercise Difficulty: {this.props.difficulty}</li>
                        </ul>




                    </PopoverBody>
                </Popover>
            </div>
        )
    }
};
