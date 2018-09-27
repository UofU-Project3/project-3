import React, { Component } from "react";
import API from "../utils/API";
import Hero from "../components/Hero";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
/* import Card from "../components/Card";
import Alert from "../components/Alert"; */

class Dashboard extends Component {
  state = {
    image: "",
    match: false,
    matchCount: 0
  };

  // When the component mounts, load the next dog to be displayed
  componentDidMount() {
     this.loadNextDog(); 
  }

  handleBtnClick = event => {
    // Get the data-value of the clicked button
    const btnType = event.target.attributes.getNamedItem("data-value").value;
    // Clone this.state to the newState object
    // We'll modify this object and use it to set our component's state
    const newState = { ...this.state };

    if (btnType === "pick") {
      // Set newState.match to either true or false depending on whether or not the dog likes us (1/5 chance)
      newState.match = 1 === Math.floor(Math.random() * 5) + 1;

      // Set newState.matchCount equal to its current value or its current value + 1 depending on whether the dog likes us
      newState.matchCount = newState.match
        ? newState.matchCount + 1
        : newState.matchCount;
    } else {
      // If we thumbs down'ed the dog, we haven't matched with it
      newState.match = false;
    }
    // Replace our component's state with newState, load the next dog image
    this.setState(newState);
    this.loadNextDog();
  };

   loadNextDog = () => {
    API.getRandomDog()
      .then(res =>
        this.setState({
          image: res.data.message
        })
      )
      .catch(err => console.log(err));
  }; 

  render() {
    return (

       <div>
       <Hero backgroundImage="https://static.smartgurutips.com//uploads/2018/05/Exercise.jpg">
      <h1>Fitness App</h1>
      <h2>Achieve your goals!</h2>
       </Hero>   

<Container style={{ marginTop: 25}}>
      <Row>
        <Col size="md-4" style={{backgroundColor:"beige"}} >
          <h1>Column 1</h1>
          <h1>Column 1</h1>
          <h1>Column 1</h1>
          <h1>Column 1</h1>
          <h1>Column 1</h1>
          <h1>Column 1</h1>
        </Col>
      
        <Col size="md-4" style={{backgroundColor:"#bbb"}}>
        <h1>Column 2</h1>
        <h1>Column 2</h1>
        <h1>Column 2</h1>
        <h1>Column 2</h1>
        <h1>Column 2</h1>
        <h1>Column 2</h1>

        </Col>

        <Col size="md-4" style={{backgroundColor:"beige"}}>
        <h1>Column 3</h1>  
        <h1>Column 3</h1> 
        <h1>Column 3</h1> 
        <h1>Column 3</h1> 
        <h1>Column 3</h1> 
        <h1>Column 3</h1>         
        </Col>
      </Row>
    </Container>

</div> 


    /*    { <div>
        <h1 className="text-center">Make New Friends</h1>
        <h3 className="text-center">
          Thumbs up on any pups you'd like to meet!
        </h3>
        <Card image={this.state.image} handleBtnClick={this.handleBtnClick} />
        <h1 className="text-center">
          Made friends with {this.state.matchCount} pups so far!
        </h1>
        <Alert style={{ opacity: this.state.match ? 1 : 0 }} type="success">
          Yay! That Pup Liked You Too!!!
        </Alert>
      </div>  } */
    );
  }
}

export default Dashboard;
