import React, {Component} from "react";
import Seat from "./Seat";
import axios from "axios";

class ClickableTable extends Component{
  state = {
    hallSettings: {width: 30, height: 10, costType: costType.cheap, businessId: 0, updateId: -1},
    Seats: this.createSeats(10, 30),
    result: null
  }

  componentDidMount() {
    axios.get(`https://localhost:5001/api/businesses`)
      .then(res => {
        this.setState({result: res.data});
        console.log(this.state.result)
      })
      .catch(ex => alert(ex));

    if(this.props.idForUpdate >= 0)
      axios.get(`https://localhost:5001/api/halls/${this.props.idForUpdate}`)
        .then(res => {
          this.setState({result: res.data});
          console.log(this.state.result)
        })
        .catch(ex => alert(ex));
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
          seat.CostType = Number(this.state.hallSettings.costType);
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
             <Seat key = {cell.Id} cell = {cell} changeState = {this.changeSeatState} hallSettings={this.state.hallSettings}/>
           )
          })}
        </tr>
      )
    })
  }

  generateOptionsForBusinesses = () => {
    let items = [];

    this.state?.result?.map((val) => {
        items.push(<option key={val.id} onChange={this.handleChange} value={val.id}>{val.name + `_${val.id}`}</option>)
    })

    return items;
  }

  onDropdownSelected(e) {
    console.log("THE VAL", e.target.value);
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
            <div className="form-group">
              <input className="form-control" name="updateId" placeholder="idToUpdate"
                     onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <div className="col-auto">
                <label htmlFor="costType">Cost Type</label>
                <select name="costType" onChange={this.handleChange} className="custom-select" id="costType">
                  <option name="costType" selected value="0">Cheap</option>
                  <option name="costType" value="1">Middle</option>
                  <option name="costType" value="2">Expensive</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-auto">
                <label htmlFor="businessSelect">Business (owner of the hall)</label>
                <select name="businessId" onChange={this.handleChange} className="custom-select" id="businessSelect">
                  {this.generateOptionsForBusinesses()}
                </select>
              </div>
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

  onSubmitToServer = (e) => {
    e.preventDefault();
    if (this.state.hallSettings.updateId !== undefined && this.state.hallSettings.updateId >= 0)
      axios.post(`https://localhost:5001/api/halls/${this.state.hallSettings.updateId}`, {
        BusinessId: Number(this.state.hallSettings.businessId),
        _Seats: JSON.stringify(this.state.Seats)
      })
        .then(res => console.log(res))
        .catch(err => alert(err));
    else
      axios.post("https://localhost:5001/api/halls", {
        BusinessId: Number(this.state.hallSettings.businessId),
        _Seats: JSON.stringify(this.state.Seats)
      })
        .then(res => console.log(res))
        .catch(err => alert(err));
  }
}

export default ClickableTable;

const costType = {
  cheap: 0,
  middle: 1,
  expensive: 2
}
