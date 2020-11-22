import React, {Component} from "react";

class Seat extends Component{
  DefineCellColor()
  {
    return this.props.cell.isChecked ? "#5cf174" : "#5ac6ec"
  }

  getStyle = () =>  {
    return {
      backgroundColor: this.DefineCellColor(),
      cursor: "pointer"
    }
  }

  changeState = (id) => {
    if (!global.IsMouseButtonPressed)
      return;

    this.props.changeState(id)
  }

  changeStateOnClick = (id) => {
    this.props.changeState(id)
  }

  setMouseState = (val) => {
    global.IsMouseButtonPressed = val;
    global.ShouldColorSeats = this.props.cell.isChecked === false;
  }

  render() {
    let id = this.props.cell.Id;
    return (
      <React.Fragment>
        <td style = {this.getStyle()} className="cell"
          onMouseUp = {this.setMouseState.bind(this, false)}
          onMouseDown = {this.setMouseState.bind(this, true)}
          onMouseEnter = {this.changeState.bind(this, id)}
          onClick = {this.changeStateOnClick.bind(this, id)}/>
      </React.Fragment>
    );
  }
}

const seatState = {
  free: 0,
  occupied: 1,
  danger: 2,
  inDanger: 3
}

const costType = {
  cheap: 0,
  middle: 1,
  expensive: 2
}

export default Seat;
