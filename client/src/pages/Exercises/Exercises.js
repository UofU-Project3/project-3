import React, { Component } from "react";
import ExerciseType from "../../components/Accordion/Accordion.js";
import CollapseItem from "../../components/Accordion/Collapse.js";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import ExerciseItem from "../../components/Form/ExerciseItem";
//import PopoverExampleMulti from "../../components/Accordion/Popover.js";
import Input from "../../components/Form/Input";
import FormBtn from "../../components/Form/FormBtn.js";

class Exercises extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exercises: [],
      strengths: [],
      stretches: [],
      olympics: [],
      cardios: [],
      powerliftings: [],
      strengthsMuscles: [],
      stretchesMuscles: [],
      olympicsMuscles: [],
      cardiosMuscles: [],
      powerliftingsMuscles: [],
      popoverOpen: false, //still need this?
      workoutName: "",
      selectedExercise: "",
      selectedExercises: [],
      workout: [],

    }
  };
  //need an onClick Function to toggle collapses

  componentDidMount() {
    this.loadExercises();

  }

  loadExercises = () => {
    console.log("got triggered");
    API.getExercises()
      .then(
        res => {

          this.setState({
            exercises: res.data,
            workoutName: "",
            selectedExercise: "",
            selectedExercises: [],
          })
          console.log("results:", res.data);
          this.sortExerciseTypes();
        }
      )
      .catch(err => console.log(err));
  };
  //filters exercises by their types
  sortExerciseTypes = () => {
    console.log(this.state.exercises[0].Type);
    const strengths = this.state.exercises.filter(strength => strength.Type !== "Stretching" && strength.Type !== "Olympic Weight Lifting" && strength.Type !== "Powerlifting" && strength.Type !== "Cardio");
    const stretches = this.state.exercises.filter(stretch => stretch.Type !== "Strength" && stretch.Type !== "Olympic Weight Lifting" && stretch.Type !== "Powerlifting" && stretch.Type !== "Cardio");
    const olympics = this.state.exercises.filter(olympic => olympic.Type !== "Stretching" && olympic.Type !== "Strength" && olympic.Type !== "Powerlifting" && olympic.Type !== "Cardio");
    const cardios = this.state.exercises.filter(cardio => cardio.Type !== "Stretching" && cardio.Type !== "Olympic Weight Lifting" && cardio.Type !== "Powerlifting" && cardio.Type !== "Strength");
    const powerliftings = this.state.exercises.filter(powerlifting => powerlifting.Type !== "Stretching" && powerlifting.Type !== "Olympic Weight Lifting" && powerlifting.Type !== "Strength" && powerlifting.Type !== "Cardio");

    this.setState({
      strengths: strengths,
      stretches: stretches,
      olympics: olympics,
      cardios: cardios,
      powerliftings: powerliftings
    })
    this.sortMuscles();
  }
  //creates list of muscle groups by type
  sortMuscles = () => {
    const strengthMuscles = [];
    const stretchMuscles = [];
    const olympicMuscles = [];
    const cardioMuscles = [];
    const powerliftingMuscles = [];
    this.state.strengths.forEach(element => {

      if (strengthMuscles.indexOf(element.Main_Muscle_Group, 0) === -1) {
        strengthMuscles.push(element.Main_Muscle_Group);
      }
    })
    this.state.stretches.forEach(element => {
      if (stretchMuscles.indexOf(element.Main_Muscle_Group, 0) === -1) {
        stretchMuscles.push(element.Main_Muscle_Group);
      }
    })
    this.state.olympics.forEach(element => {
      if (olympicMuscles.indexOf(element.Main_Muscle_Group, 0) === -1) {
        olympicMuscles.push(element.Main_Muscle_Group);
      }
    })
    this.state.cardios.forEach(element => {
      if (cardioMuscles.indexOf(element.Main_Muscle_Group, 0) === -1) {
        cardioMuscles.push(element.Main_Muscle_Group);
      }
    })
    this.state.powerliftings.forEach(element => {
      if (powerliftingMuscles.indexOf(element.Main_Muscle_Group, 0) === -1) {
        powerliftingMuscles.push(element.Main_Muscle_Group);
      }
    })

    this.setState({
      strengthsMuscles: strengthMuscles,
      stretchesMuscles: stretchMuscles,
      olympicsMuscles: olympicMuscles,
      cardiosMuscles: cardioMuscles,
      powerliftingsMuscles: powerliftingMuscles
    })


  }

  //pushes the exercise id & name into an array upon clicking the save button
  saveExercise = (result) => {
    const workoutName = this.state.workoutName;
    if(workoutName === ""){
    let newWorkout = prompt("What do you want to Call New Workout?", "New Workout");
    if (newWorkout === null || newWorkout === "") {
      alert("Workout must be named!");
    } else {

      const selectedExercise = { name: result.Name, exercise: result._id };
      //selectedExercises.push(selectedExercise);
      this.setState({
        selectedExercises: [...this.state.selectedExercises, selectedExercise],
        workoutName: newWorkout
      });
      console.log("State of selectedExercises in saveExercise: ", this.state.selectedExercises);
    }
  }else {

    const selectedExercise = { name: result.Name, exercise: result._id };
    //selectedExercises.push(selectedExercise);
    this.setState({
      selectedExercises: [...this.state.selectedExercises, selectedExercise]
    });
  };
    }
    formatWorkout = () => {
      const tempArr = []
      this.state.selectedExercises.forEach(exercise => {
tempArr.push(exercise.exercise);
console.log("TempARR: ",tempArr);
      })
      this.setState({
        workout: [tempArr]
      }, this.saveWorkout(tempArr));
     

    console.log("WORKOUT: ",this.state.workout);

  }
  saveWorkout = (tempArr) => {
    API.saveWorkout({
      Name: this.state.workoutName,
      Exercises: tempArr,
      Dates: []
    }).catch(err => console.log("WorkoutDb: ",err));
  };
  deleteExercise = id => {

    console.log("State of selectedExercises in deleteExercise: ", this.state.selectedExercises);
    const clickedExercise = this.state.selectedExercises.filter(selectedExercise => selectedExercise.exercise !== id);
    this.setState({ selectedExercises: clickedExercise });
    console.log("After Delete Button: ", this.state.selectedExercises);
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(value);
  };

  //this refreshes the form
  searchArticles = query => {
    //gets from database
    API.search(query)
      .then(res => {
        console.log(this.state)
        this.setState({
          results: res.data.response.docs,
          search: "", startDate: "", endDate: ""
        })
        console.log(this.state)
      }
      )
      .catch(err => console.log(err));

  };

  //handleFormSubmit = event => {
  //  event.preventDefault();
  //  if (this.state.workoutName ) {
  ////    API.saveWorkout({
  ////      Name: result.headline.main,
  ////    Exercises: result.pub_date,
  ////    Dates: []
  ////  })
  //    //.then(res => this.loadExercises())
  //    .catch(err => console.log(err));
  //}
  //};


  render() {
    return (
      <Container fluid>
        <Row>

          <Col size="md-3 sm-12">
            <div className="accordion" id="accordionExample">
              {/*} Convert the 5 types into objects that have an array of of Muscle Groups, that way the array
            that is mapped can be done once.
            types:[cardios[musclegroups[exercises]], olympics[musclegroups[exercises]], powerliftings[musclegroups[exercises]], strengths[musclegroups[exercises]], stretches[musclegroups[exercises]]]*/}
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h5 className="mb-0">
                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Cardio
                    </button>
                  </h5>
                </div>
                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div className="card-body">
                    <ul>
                      {this.state.cardiosMuscles.map(cardio => (
                        <ExerciseType
                          key={cardio.replace(/\s/g, '') + "Type"}
                          id={cardio.replace(/\s/g, '') + "Type"}
                          group={cardio}
                        >
                          {this.state.cardios.map(cardios => (
                            <CollapseItem
                              key={cardios._id}
                              id={cardios._id}
                              name={cardios.Name}
                              otherMuscleGroups={cardios.Other_Muscle_Groups}
                              detailedMuscleGroup={cardios.Detailed_Muscle_Group}
                              equipment={cardios.Equipment}
                              difficulty={cardios.Difficulty}
                              data={cardios}
                              //saveWorkout={this.saveWorkout}
                              saveExercise={this.saveExercise}
                            />))}
                        </ExerciseType>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h5 className="mb-0">
                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                      Olympic Weight Lifting
                    </button>
                  </h5>
                </div>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                  <div className="card-body">
                    <ul>
                      {this.state.olympicsMuscles.map(olympic => (
                        <ExerciseType
                          key={olympic.replace(/\s/g, '') + "Type"}
                          id={olympic.replace(/\s/g, '') + "Type"}
                          group={olympic}
                        >
                          {this.state.olympics.map(olympics => (
                            <CollapseItem
                              key={olympics._id}
                              id={olympics._id}
                              name={olympics.Name}
                              otherMuscleGroups={olympics.Other_Muscle_Groups}
                              detailedMuscleGroup={olympics.Detailed_Muscle_Group}
                              equipment={olympics.Equipment}
                              difficulty={olympics.Difficulty}
                              data={olympics}
                              // saveWorkout={this.saveWorkout}
                              saveExercise={this.saveExercise}

                            />))}
                        </ExerciseType>

                      ))}
                    </ul>
                  </div>
                </div>
              </div>


              <div className="card">
                <div className="card-header" id="headingThree">
                  <h5 className="mb-0">
                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                      Powerlifting
                    </button>
                  </h5>
                </div>
                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                  <div className="card-body">
                    <ul>
                      {this.state.powerliftingsMuscles.map(powerlifting => (
                        <ExerciseType
                          key={powerlifting.replace(/\s/g, '') + "Type"}
                          id={powerlifting.replace(/\s/g, '') + "Type"}
                          group={powerlifting}
                        >
                          {this.state.powerliftings.map(powerliftings => (
                            <CollapseItem
                              key={powerliftings._id}
                              id={powerliftings._id}
                              name={powerliftings.Name}
                              otherMuscleGroups={powerliftings.Other_Muscle_Groups}
                              detailedMuscleGroup={powerliftings.Detailed_Muscle_Group}
                              equipment={powerliftings.Equipment}
                              difficulty={powerliftings.Difficulty}
                              data={powerliftings}
                              //saveWorkout={this.saveWorkout}
                              saveExercise={this.saveExercise}

                            />))}
                        </ExerciseType>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header" id="headingFour">
                  <h5 className="mb-0">
                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                      Strength
                    </button>
                  </h5>
                </div>
                <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                  <div className="card-body">
                    <ul>
                      {this.state.strengthsMuscles.map(strength => (

                        <ExerciseType
                          key={strength.replace(/\s/g, '') + "Type"}
                          id={strength.replace(/\s/g, '') + "Type"}
                          group={strength}
                        >
                          {this.state.strengths.map(strengths => (
                            <CollapseItem
                              key={strengths._id}
                              name={strengths.Name}
                              id={strengths._id}
                              otherMuscleGroups={strengths.Other_Muscle_Groups}
                              detailedMuscleGroup={strengths.Detailed_Muscle_Group}
                              equipment={strengths.Equipment}
                              difficulty={strengths.Difficulty}
                              data={strengths}
                              //saveWorkout={this.saveWorkout}
                              saveExercise={this.saveExercise}

                            />))}
                        </ExerciseType>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header" id="headingFive">
                  <h5 className="mb-0">
                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                      Stretches
                    </button>
                  </h5>
                </div>
                <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                  <div className="card-body">
                    <ul>
                      {this.state.stretchesMuscles.map(stretch => (

                        <ExerciseType
                          key={stretch.replace(/\s/g, '') + "Type"}
                          id={stretch.replace(/\s/g, '') + "Type"}
                          group={stretch}
                        >
                          {this.state.stretches.map(stretches => (
                            <CollapseItem
                              key={stretches._id}
                              id={stretches._id}
                              data={stretches}
                              name={stretches.Name}
                              otherMuscleGroups={stretches.Other_Muscle_Groups}
                              detailedMuscleGroup={stretches.Detailed_Muscle_Group}
                              equipment={stretches.Equipment}
                              difficulty={stretches.Difficulty}
                              saveExercise={this.saveExercise}
                            //

                            >

                            </CollapseItem>



                          ))}
                        </ExerciseType>

                      ))}
                    </ul>
                  </div>
                </div>
              </div>







            </div >
          </Col >
          <Col size="md-6">
            <div>
              {!this.state.workoutName ? (
                <h1 className="text-center">Choose an Exercise to Begin</h1>

              ) : (


                  <div className="card">
                    <Input
                      name={this.state.workoutName}
                    />

                    {this.state.selectedExercises.map(exercise => (
                      <ExerciseItem
                        key={exercise.exercise}
                        id={exercise.exercise}
                        name={exercise.name}
                        deleteExercise={this.deleteExercise}
                      />
                    ))}
                    <FormBtn
                  formatWorkout={this.formatWorkout}
                />
                  </div>
                  
                )}
            </div>

          </Col>
          <Col size="md-3">
          </Col>
        </Row >
      </Container >
    );
  }
}

export default Exercises;
