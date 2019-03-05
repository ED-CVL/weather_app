import React, { Component } from "react";
import './style.css';
import anime from 'animejs';

function rainDrop(key, startPostion, randomDelay) {
  const styles = {
    left: startPostion+'%',
    animationDelay: randomDelay+'s',
  }
  return <div className={'rain-drop'} key={'rain-drop'+key} style={styles}/>
}

function cloud(number) {
  return <div className={'cloud cloud' + number} />
}

class Rain extends Component {
  constructor(props){
    super(props);
    this.state = {
      createRainCount: [],
    }
    this.lightRain = this.lightRain.bind(this);
    this.mediumRain = this.mediumRain.bind(this);
    this.heavyRain = this.heavyRain.bind(this);
    this.random = this.random.bind(this);
    this.animeRain = this.animeRain.bind(this);
  }

  componentDidMount(){
    this.animeRain()
  }

  rainLevel(level){
    if(level === 'light'){
      this.lightRain()
    } else if(level === 'medium'){
      return this.mediumRain()
    } else {
      return this.heavyRain()
    }
  }

  lightRain(){
    const { createRainCount } = this.state;
    for(let i = 0; i < 150; i++){
      createRainCount.push(i);
    }
  }

  mediumRain(){
  }

  heavyRain(){
  }

  random(min, max){
   return Math.random() * (max-min) + min;
  }

  animeRain(){
    anime({
      targets: '.rain-drop',
      translateY: [-40, 950],
      easing: 'linear',
      duration: 800,
      delay: anime.stagger(100),
      loop: true,
    });
  }

  render() {
    const { createRainCount } = this.state;
    return(
      <div id='rain'>
        {this.rainLevel('light')}
        {createRainCount.map( i => rainDrop(i, this.random(0,90), this.random(0,1500)))}
        <div id='clouds'>
          {cloud(1)}
          {cloud(2)}
          {cloud(3)}
        </div>
      </div>
    )
  }
}

export default Rain;
