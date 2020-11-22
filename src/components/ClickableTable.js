import React, {Component} from "react";
import Seat from "./Seat";
import axios from "axios";

class ClickableTable extends Component{
  state = {
    hallSettings: {width: 30, height: 10},
    Seats: this.createSeats(10, 30)
  }

  createSeats(row, col){
    let rows = new Array(row);

    for (let i = 0; i < rows.length; i++) {
      rows[i] = new Array(col);

      for (let j = 0; j < rows[i].length; j++){
        rows[i][j] = {
          Id: i * rows[i].length + j,
          isChecked: false,
          CostType: 0,
          State: 0,
          UserId: null
        };
      }
    }

    return rows;
  }

  changeSeatState = (id) => {
    this.setState(this.state.Seats.map((row) => {
      row.map((seat) => {
        if(seat.Id === id){
          if(global.ShouldColorSeats && seat.isChecked
            || !global.ShouldColorSeats && !seat.isChecked)
            return;

          seat.isChecked = !seat.isChecked;
          seat.UserId = seat.UserId === null ? seat.Id : null;
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

  handleChange = (e) => {
    let settings = this.state.hallSettings;
    settings[e.target.name] = e.target.value.trim();
    this.setState({hallSettings: settings});
  };

  render() {
    const {width, height} = this.state.hallSettings;

    return (
      <div style={{width: window.innerWidth * .98, height: window.innerHeight * .85}}>
        <h1 className="container-fluid">Draw your hall {height}X{width}</h1>
        <div className="container-fluid w-75 float-left" >
          <table style={{width: "100%", height: 600}}>
            <tbody>{this.renderHall()}</tbody>
          </table>
        </div>
        <div className="float-left bg-info" style={{width: "25%", height: 600}}>
          <form onSubmit={this.onSubmit} className="container mt-3">
            <div className="form-group">
              <input className="form-control" name="width" placeholder="width"
                     onChange={this.handleChange}/>
              <p className="text-center m-0">X</p>
              <input className="form-control" name="height" placeholder="height"
                     onChange={this.handleChange}/>
            </div>
            <input className="btn btn-sm border-dark bg-light" type="submit" value="Change seat number"/>
          </form>

          <form onSubmit={this.onSubmitToServer} className="container mt-3">
            <input className="btn btn-primary" type="submit"/>
          </form>
        </div>
      </div>
    );
  }

  onSubmit = (e) =>{
    e.preventDefault();

    const {width, height} = this.state.hallSettings;
    this.state.Seats = [];
    this.setState({Seats: this.createSeats(Number(height), Number(width))})
  }

  onSubmitToServer = (e) =>{
    e.preventDefault();

    axios.post("https://localhost:5001/api/halls/1", {
      Business: null,
      _Seats: JSON.stringify(this.state.Seats)
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
}

export default ClickableTable;
