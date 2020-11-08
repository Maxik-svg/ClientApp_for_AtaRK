import React, {Component} from "react";

class Seat extends Component{
  DefineCellColor()
  {
    return this.props.cell.IsChecked ? "#5cf174" : "#5ac6ec"
  }

  getStyle = () =>  {
    return {
      backgroundColor: this.DefineCellColor(),
      cursor: "pointer",
      width: window.innerWidth * .9 / 30,
      height: window.innerHeight * .9 / 12
    }
  }

  changeState = (id) => {
    if (!global.IsMouseButtonPressed)
      return;

    this.props.changeState(id)
  }

  setMouseState = (val) => {
    global.IsMouseButtonPressed = val;
    global.ShouldColorSeats = this.props.cell.IsChecked === false;
  }

  render() {
    let id = this.props.cell.Id;
    return (
      <React.Fragment>
        <td style = {this.getStyle()} className="cell"
            onMouseUp = {this.setMouseState.bind(this, false)}
            onMouseDown = {this.setMouseState.bind(this, true)}
            onMouseOver = {this.changeState.bind(this, id)}
            onClick = {(e) => this.changeState.bind(this, id, e)}> </td>
      </React.Fragment>
    );
  }
}

export default Seat;
