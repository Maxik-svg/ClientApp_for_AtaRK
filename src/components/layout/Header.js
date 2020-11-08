import React, {Component} from 'react';
import {render} from "@testing-library/react";

class Header extends Component{
  printNavPages = () => {
    return Object.keys(pages).map((title) => {
      return(
        <a className="nav-item nav-link" href={pages[title]}>{title}</a>
      )
    })
  }

  render() {
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">PHP for business</a>
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

const pages = {Users: "#", Halls: "#"};

export default Header;
