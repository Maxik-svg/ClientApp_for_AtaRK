import React, {Component} from "react";
import Seat from "./Seat";

class ClickableTable extends Component{
  state = {
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
          if(global.ShouldColorSeats && seat.IsChecked
            || !global.ShouldColorSeats && !seat.IsChecked)
            return;

          seat.IsChecked = !seat.IsChecked;
        }

        return seat;
      })
      return row;
    }))
  }

  renderHall = () => {
    return this.state.Seats.map((value, key) => {
      return (
        <tr key={key}>
          {value.map((cell) => {
           return (
             <Seat key = {cell.Id} cell = {cell} changeState = {this.changeSeatState}/>
           )
          })}
        </tr>
      )
    })
  }

  render() {
    return (
      <React.Fragment>
        <h1>{10}X{30}</h1>
        <div className="container float-left">
          <table style={{width:1500, height: 800}}>
            <tbody>{this.renderHall()}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default ClickableTable;
