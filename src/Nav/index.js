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
        <nav class="navbar is-info" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        Home
      </a>

      <a class="navbar-item">
        About
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          Top Cities
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            New York City, NY 
          </a>
          <a class="navbar-item">
            Chicago, IL
          </a>
          <a class="navbar-item">
            Miami, FL
          </a>
          <a class="navbar-item">
          Los Angeles, CA
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
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