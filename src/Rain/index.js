import React, { Component } from "react";
import './style.css';
import anime from 'animejs';

class Rain extends Component {
  constructor(props){
    super(props);
    this.lightRain = this.lightRain.bind(this);
    this.mediumRain = this.mediumRain.bind(this);
    this.heavyRain = this.heavyRain.bind(this);
    this.random = this.random.bind(this);
    this.animeRain = this.animeRain.bind(this);
    this.createRain = this.createRain.bind(this);
  }

  componentDidMount(){
    this.animeRain()
  }

  rainLevel(level){
    if(level === 'light'){
      return this.lightRain()
    } else if(level === 'medium'){
      return this.mediumRain()
    } else {
      return this.heavyRain()
    }
  }

  createRain(){
    return <div className='rain-drop'></div>
  }

  lightRain(){
    return this.createRain();
  }

  mediumRain(){
  }

  heavyRain(){
  }

  random(min, max){
   return Math.random() * (max-min) + min;
  }

  animeRain(){
    let startPosition = this.random(0,200);
    anime({
      targets: '.rain-drop',
      translateY: 650,
      translateX: [startPosition, startPosition],
      easing: 'linear',
      duration: 1500,
      complete: function() {
      }
    });
  }

  render() {
    return(
      <div id='rain'>
        {this.rainLevel('light')}
      </div>
    )
  }
}

export default Rain;
