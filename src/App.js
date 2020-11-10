import './App.css';
import React, {Component} from "react";
import ClickableTable from "./components/ClickableTable";
import Header from "./components/layout/Header";
import "bootstrap"

global.IsMouseButtonPressed = false;

class App extends Component{
  state = {
    N: 10,
    M: 30,

  }

  render() {
    return (
      <div className="App">
        <Header />
        <h1>App</h1>
        <ClickableTable />
      </div>
    );
  }
}

export default App;
