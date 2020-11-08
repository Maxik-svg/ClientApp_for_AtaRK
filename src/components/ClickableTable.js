import React, {Component} from "react";
import Seat from "./Seat";

class ClickableTable extends Component{
  renderHall = () => {
    return this.props.Seats.map((value, key) => {
      return (
        <tr key={key}>
          {value.map((cell) => {
           return (
             <Seat key = {cell.Id} cell = {cell} changeState = {this.props.changeSeatState}/>
           )
          })}
        </tr>
      )
    })
  }

  render() {
    return (
      <React.Fragment>
        <h1>{this.props.N}X{this.props.M}</h1>
        <table>
          <tbody>{this.renderHall()}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default ClickableTable;
