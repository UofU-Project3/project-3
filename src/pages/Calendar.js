import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import Alert from "../components/Alert";
import Hero from "../components/Hero";
import Row from "../components/Row";
import Col from "../components/Col";

class Calendar extends Component {
  state = {
    search: "",
    breeds: [],
    results: [],
    error: ""
  };

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  componentDidMount() {
    API.getBaseBreedsList()
      .then(res => this.setState({ breeds: res.data.message }))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getDogsOfBreed(this.state.search)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.message, error: "" });
      })
      .catch(err => this.setState({ error: err.message }));
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
       </Col>
     
       <Col size="md-8" style={{backgroundColor:"#bbb"}}>
       <h1>Column 2</h1>
       </Col>
     </Row>
   </Container>

</div> 
    );
  }
}

export default Calendar;
