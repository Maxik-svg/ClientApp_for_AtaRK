import './App.css';
import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ClickableTable from "./components/ClickableTable";
import Header from "./components/layout/Header";
import "bootstrap"
import Users from "./components/pages/Users";

global.IsMouseButtonPressed = false;

class App extends Component{
  state = {
    N: 10,
    M: 30,

  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Route exact path="/" render={props => (
            <React.Fragment>
              <h1>App</h1>
              <ClickableTable />
            </React.Fragment>
          )} />
          <Route path="/users" component={Users}/>
        </Router>
      </div>
    );
  }
}

export default App;
