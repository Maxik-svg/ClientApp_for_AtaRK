import React, {Component} from 'react';
import axios from "axios";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      idForUpdate: null,
      updatingDbStarted : false,
    }
  }

  componentDidMount() {
    axios.get("https://localhost:5001/api/users")
      .then(res => {
        this.setState({result: res.data});
        console.log(this.state.result)
      })
  }

  renderTableHeader() {
    if(this.state.result[0] !== undefined){
      const {id, name, email, password, info, braceletId} = this.state.result[0]
        return (
          <React.Fragment>
            <th>{"id"}</th>
            <th>{"name"}</th>
            <th>{"email"}</th>
            <th>{"password"}</th>
            <th>{"info"}</th>
            <th>{"braceletId"}</th>
          </React.Fragment>
      )
    }
  }

  renderTableData = () => {
    return this.state.result.map((user, index) => {
      const { id, name, email, password, info, braceletId } = user //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{password}</td>
          <td>{info ?? "null"}</td>
          <td>{braceletId ?? "null"}</td>
          <td><a style={linkStyle} onClick={ () => {
            axios.delete("https://localhost:5001/api/users/"+id)
              .then(this.setState({result: [...this.state.result.filter((x) => x.id
                  !== id)]})).catch((reason => console.log(reason)))
          }}>
            delete</a></td>
          <td><a style={linkStyle} onClick={() => this.setState({idForUpdate: id, updatingDbStarted: true})}>update</a></td>
        </tr>
      )
    })
  }

  renderAddOrUpdateForm = () => {
    if(!this.state.updatingDbStarted)
      return;

    return(
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <input type="name" placeholder="Name"  onChange={(e) => this.setState({name: e.target.value})}/>
          <input type="email" placeholder="Email"  onChange={(e) => this.setState({email: e.target.value})} />
          <input type="password" placeholder="Password"  onChange={(e) => this.setState({password: e.target.value})} />
          <input type="info" placeholder="Info"  onChange={(e) => this.setState({info: e.target.value})} />
          <input type="braceletId" placeholder="BraceletId"  onChange={(e) => this.setState({braceletId: e.target.value})} />
          <input type="submit" />
        </form>
      </React.Fragment>
    )
  }

  onSubmit = (e) => {
    e.preventDefault();
    let valuesToSend = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      info: this.state.info,
      braceletId: this.state.braceletId
    }

    console.log(valuesToSend);

    let idForUpdate = this.state.idForUpdate;
    if (idForUpdate == null){
      axios.post("https://localhost:5001/api/users", valuesToSend)
        .then(res =>
          this.setState({result: [...this.state.result, res.data], idForUpdate: null, updatingDbStarted: false})
        ).catch((reason => console.log(reason)));
    }
    else{
      axios.post(`https://localhost:5001/api/users/${idForUpdate}`, valuesToSend)
        .then(res =>
          this.setState({result: this.state.result.map((val) => {
              if(val.id === idForUpdate){
                val.name = valuesToSend.name;
                val.email = valuesToSend.email;
                val.password = valuesToSend.password
                val.info = valuesToSend.info;
                val.braceletId = valuesToSend.braceletId;
              }

              return val;
            }), idForUpdate: null, updatingDbStarted: false})
        ).catch(reason => console.log(reason));
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Users</h1>
        <table>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
        <button onClick={() => this.setState({updatingDbStarted: true})}>Add</button>
        {this.renderAddOrUpdateForm()}
      </React.Fragment>
    );
  }
}

const linkStyle = {
  textDecoration: "underline",
  color:"blue",
  cursor: "pointer"
}

export default Users;