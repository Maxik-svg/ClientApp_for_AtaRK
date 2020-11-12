import React, {Component} from 'react';
import {Link} from "react-router-dom";

const pages = {users: "#", halls: "#"};

class Header extends Component{
  printNavPages = () => {
    return Object.keys(pages).map((title) => {
      let upperCaseTitle = title.charAt(0).toUpperCase() + title.slice(1);
      return(
        <div key={title} className="nav-item dropdown">
          <Link to={"/"+ title} id={title} className="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{upperCaseTitle}</Link>
          <div className="dropdown-menu" aria-labelledby={title}>
            <Link className="dropdown-item" to={"/"+ title}>{upperCaseTitle}</Link>
            <a className="dropdown-item" href="#">Another action</a>
            <a className="dropdown-item" href="#">Something else here</a>
          </div>
        </div>
      )
    })
  }

  render() {
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand" href="#">PHP for business</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {this.printNavPages()}
          </div>
        </div>
      </nav>
    )
  }
}

export default Header;
