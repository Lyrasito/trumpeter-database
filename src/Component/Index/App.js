import React, { Component } from "react";
import "./Landing.css";
import {
  Link,
  HashRouter as Router,
  Route,
  browserHistory,
} from "react-router-dom";
import EditApp from "../Edit/EditApp";

import Landing from "./Landing";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route path="/edit" component={EditApp} />
        </div>
      </Router>
    );
  }
}

export default App;
