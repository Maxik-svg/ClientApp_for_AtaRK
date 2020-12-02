import React, {Component} from 'react';
import axios from "axios";
import ClickableTable from "../ClickableTable";

class ShowHalls extends Component {
  state = {
    result: null,
  }

  componentDidMount() {
    axios.get(`https://localhost:5001/api/halls`)
      .then(res => {
        this.setState({result: res.data});
        console.log(this.state.result)
      })
      .catch(ex => alert(ex));
  }

  renderTableHeader() {
    if (this.state.result != null && this.state.result[0] !== undefined) {
      return (
        <React.Fragment>
          <th>{"id"}</th>
          <th>{"businessId"}</th>
        </React.Fragment>
      )
    }
  }

  renderTableData = () => {
    return this.state.result?.map((hall) => {
      const {id, businessId} = hall //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{businessId}</td>
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

  renderHallUi = (id) => {
    return (<ClickableTable idForUpdate={id}/>);
  }

  renderOtherStuff = () => {
    return (
      <div className="container">
        <h1>{sourceTable.charAt(0).toUpperCase() + sourceTable.slice(1)}</h1>
        <table className="table table-striped  m-md-2">
          <tbody>
          <tr>{this.renderTableHeader()}</tr>
          {this.renderTableData()}
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.state.updatingDbStarted ? this.renderHallUi(this.state.idForUpdate) : this.renderOtherStuff()}
      </React.Fragment>
    );
  }
}

const linkStyle = {
  textDecoration: "underline",
  color: "blue",
  cursor: "pointer"
}

const sourceTable = "halls"

export default ShowHalls;
