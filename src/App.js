import './App.css';
import React, {Component} from "react";
import ClickableTable from "./components/ClickableTable";

global.IsMouseButtonPressed = false;

class App extends Component{
  state = {
    N: 10,
    M: 30,
    Seats: this.createSeats(10, 30)
  }

  createSeats(row, col){
    let rows = new Array(row);

    for (let i = 0; i < rows.length; i++) {
      rows[i] = new Array(col);

      for (let j = 0; j < rows[i].length; j++){
        rows[i][j] = {
          Id: j * 10 + i,
          IsChecked: false,
          CostType: 0,
          State: 0
        };
      }
    }

    return rows;
  }

  changeSeatState = (id) => {
    this.setState(this.state.Seats.map((row) => {
      row.map((seat) => {
        if(seat.Id === id){
          if(global.ShouldColorSeats & seat.IsChecked)
            return;

          if(!global.ShouldColorSeats && !seat.IsChecked)
            return;

          seat.IsChecked = !seat.IsChecked;
        }


        return seat;
      })
      return row;
    }))
    //console.log("state changed " + this.state.Seats[x][y])
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo"/>*/}
        </header>
        <h1>App</h1>
        <ClickableTable N = {this.state.N} M = {this.state.M} Seats = {this.state.Seats} changeSeatState = {this.changeSeatState}/>

      </div>
    );
  }
}

export default App;
