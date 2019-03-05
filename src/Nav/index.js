import React, { Component } from "react";
import 'bulma/css/bulma.css';
import "./style.css";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }


  render() {
    return (
        <nav className="navbar is-info" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
    </a>

    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
      <a className="navbar-item">
        Home
      </a>

      <a className="navbar-item">
        About
      </a>

      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">
          Top Cities
        </a>

        <div className="navbar-dropdown">
          <p onClick={() => this.props.getWeatherDataCity("New York", "US")} className="navbar-item">
            New York City, NY 
          </p>
          <p onClick={() => this.props.getWeatherDataCity("Chicago", "US")} className="navbar-item">
            Chicago, IL
          </p>
          <p onClick={() => this.props.getWeatherDataCity("Miami", "US")} className="navbar-item">
            Miami, FL
          </p>
          <p onClick={() => this.props.getWeatherDataCity("Los Angeles", "US")} className="navbar-item">
          Los Angeles, CA
          </p>
          <p onClick={() => this.props.getWeatherDataCity("Austin", "US")} className="navbar-item">
          Austin, TX
          </p>
          <p onClick={() => this.props.getWeatherDataCity("Nashville", "US")} className="navbar-item">
          Nashville, TN
          </p>
        </div>
      </div>
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <a className="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a className="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
    );
  }
}

export default Nav;