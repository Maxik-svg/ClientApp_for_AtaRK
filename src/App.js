import './App.css';
import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ClickableTable from "./components/ClickableTable";
import Header from "./components/layout/Header";
import "bootstrap"
import Users from "./components/pages/Users";
import Businesses from "./components/pages/Businesses";
import Bracelets from "./components/pages/Bracelets";
import ShowHalls from "./components/pages/ShowHalls";

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
              <h1>About PHP For Business</h1>
              <p>Author: m.buzko 2020</p>
              <p>Version: 1.0.0</p>
              <ClickableTable/>
            </React.Fragment>
          )} />
          <Route path="/users" component={Users}/>
          <Route path="/businesses" component={Businesses}/>
          <Route path="/bracelets" component={Bracelets}/>
          <Route path="/halls" component={ShowHalls}/>
          <Route path="/halls/addOrUpdate" component={ClickableTable}/>
        </Router>
      </div>
    );
  }
}

export default App;
