import React, { Component } from "react";
import "./style.css";

class Logo extends Component {
  render() {
    return (
      <svg id="weather-logo" width="1000" height="1000" viewBox="0 0 1000 1000">
        <defs>
          <style>
          </style>
        </defs>
        <path id="sun" d="M209.461 500a100.061 100.061 0 0 1 200.122 0" class="sun-class"/>
        <path id="ray" d="M172 386.722L181 376l65.92 55.28-9 10.724z" class="sun-class"/>
        <path id="ray_ray2" d="M438.041 376l9 10.724L381.126 442l-9-10.724z" class="sun-class"/>
        <path id="ray_ray3" d="M302.518 323h14.008v86h-14.008v-86z" class="sun-class"/>
        <text id="eather" class="text-class" transform="translate(405.37 493.219)">
       eather
        </text>
      </svg>
    );
  }
}

export default Logo;
