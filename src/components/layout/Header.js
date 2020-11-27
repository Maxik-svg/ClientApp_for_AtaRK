import React, {Component} from 'react';
import {Link} from "react-router-dom";

const pages = {businesses: "#", users: "#", halls: "#", bracelets: "#"};

class Header extends Component{
  printNavPages = () => {
    return Object.keys(pages).map((title) => {
      let upperCaseTitle = title.charAt(0).toUpperCase() + title.slice(1);
      return (
        <Link key={title} to={"/" + title} id={title} className="nav-link">{upperCaseTitle}</Link>
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
