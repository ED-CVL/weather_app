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

function topCloud() {
  return  (<div className='cloud base'>
            <div className='cloud bottom-left'/>
            <div className='cloud bottom-right'/>
            <div className='cloud bottom-center'/>
          </div>)
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
    anime({
      targets: '.cloud.base',
      translateX: ['0%', '-100%'],
      left: [anime.stagger(250), anime.stagger(250)],
      easing: 'linear',
      duration: 20000,
      loop: true,
    })
  }

  render() {
    const { createRainCount } = this.state;
    return(
      <div id='rain'>
        {this.rainLevel('light')}
        {createRainCount.map( i => rainDrop(i, this.random(0,90), this.random(0,1500)))}
        <div id='clouds'>
          {topCloud()}
          {topCloud()}
          {topCloud()}
          {topCloud()}
          {topCloud()}
          {topCloud()}
          {topCloud()}
        </div>
      </div>
    )
  }
}

export default Rain;
