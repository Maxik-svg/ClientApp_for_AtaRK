import React, {Component} from 'react';
import axios from "axios";

class Bracelets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toSend: [],
      result: [],
      idForUpdate: null,
      updatingDbStarted: false,
    }
  }

  componentDidMount() {
    axios.get(`https://localhost:5001/api/${sourceTable}`)
      .then(res => {
        this.setState({result: res.data});
        console.log(this.state.result)
      })
  }

  renderTableHeader() {
    if (this.state.result[0] !== undefined) {
      return (
        <React.Fragment>
          <th>{"id"}</th>
          <th>{"temperature"}</th>
          <th>{"userId"}</th>
        </React.Fragment>
      )
    }
  }

  renderTableData = () => {
    return this.state.result.map((bracelet) => {
      const {id, temperature, userId} = bracelet //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{temperature}</td>
          <td>{userId}</td>
          <td><a style={linkStyle} onClick={() => {
            axios.delete(`https://localhost:5001/api/${sourceTable}/` + id)
              .then(this.setState({
                result: [...this.state.result.filter((x) => x.Id
                  !== id)]
              })).catch((reason => alert(reason)))
          }}>
            delete</a></td>
          <td><a style={linkStyle} onClick={() => this.setState({idForUpdate: id, updatingDbStarted: true})}>update</a>
          </td>
        </tr>
      )
    })
  }

  handleChange = (e) => {
    let res = this.state.toSend;
    res[e.target.name] = e.target.value.trim();
    this.setState({toSend: res});
  };

  renderAddOrUpdateForm = () => {
    if (!this.state.updatingDbStarted)
      return;

    return (
      <div>
        <form onSubmit={this.onSubmit} className="container">
          <div className="form-group">
            <input className="form-control" name="temperature" placeholder="Temperature (36.6)"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <input className="form-control" name="userId" placeholder="userID (0)"
                   onChange={this.handleChange}/>
          </div>
          <input className="btn btn-primary" type="submit"/>
        </form>
      </div>
    )
  }

  onSubmit = (e) => {
    e.preventDefault();
    let valuesToSend = {
      temperature: this.state.toSend.temperature,
      userId: this.state.toSend.userId,
    }

    console.log(valuesToSend);

    let idForUpdate = this.state.idForUpdate;
    if (idForUpdate == null) {
      axios.post(`https://localhost:5001/api/${sourceTable}`, valuesToSend)
        .then(res =>
          this.setState({result: [...this.state.result, res.data], idForUpdate: null, updatingDbStarted: false})
        ).catch((reason => alert(reason)));
    } else {
      axios.post(`https://localhost:5001/api/${sourceTable}/${idForUpdate}`, valuesToSend)
        .then(() =>
          this.setState({
            result: this.state.result.map((val) => {
              if (val.Id === idForUpdate) {
                val.temperature = valuesToSend.temperature;
                val.userId = valuesToSend.userId;
              }

              return val;
            }), idForUpdate: null, updatingDbStarted: false, toSend: []
          })
        ).catch(reason => alert(reason));
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>{sourceTable.charAt(0).toUpperCase() + sourceTable.slice(1)}</h1>
        <table className="table table-striped  m-md-2">
          <tbody>
          <tr>{this.renderTableHeader()}</tr>
          {this.renderTableData()}
          </tbody>
        </table>
        <button className="btn-sm" onClick={() => this.setState({updatingDbStarted: true})}>Add new item</button>
        {this.renderAddOrUpdateForm()}
      </div>
    );
  }
}

const linkStyle = {
  textDecoration: "underline",
  color: "blue",
  cursor: "pointer"
}

const sourceTable = "bracelets"

export default Bracelets;
