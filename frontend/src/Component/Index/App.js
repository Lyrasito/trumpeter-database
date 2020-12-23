import React, { Component } from "react";
import "./Landing.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import EditApp from "../Edit/EditApp";
import Landing from "./Landing";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={Landing} />
          <Route path="/edit" component={EditApp} />
        </div>
      </Router>
    );
  }
}

export default App;
