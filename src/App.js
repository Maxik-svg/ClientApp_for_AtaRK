import './App.css';
import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ClickableTable from "./components/ClickableTable";
import Header from "./components/layout/Header";
import "bootstrap"
import Users from "./components/pages/Users";
import Businesses from "./components/pages/Businesses";
import Bracelets from "./components/pages/Bracelets";

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
              <ClickableTable />
            </React.Fragment>
          )} />
          <Route path="/users" component={Users}/>
          <Route path="/businesses" component={Businesses}/>
          <Route path="/bracelets" component={Bracelets}/>
        </Router>
      </div>
    );
  }
}

export default App;
