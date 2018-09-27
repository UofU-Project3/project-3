import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import Register from "./pages/Register";

const App = () => (
  <Router>
    <div>
      <Navbar />
      <Wrapper>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/register" component={Register} />
      </Wrapper>
      <Footer />
    </div>
  </Router>
);

export default App;
