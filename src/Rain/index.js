import React, { Component } from "react";
import './style.css';
import anime from 'animejs';
import { CSSTransitionGroup } from 'react-transition-group';

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
    }
  }

  renderVideo(weatherDesc) {
    switch(weatherDesc){
      case "clouds":
      return "https://s3.amazonaws.com/project-4-bucket/Pexels+Videos+3611.mp4";
      case "snow":
      return "https://s3.amazonaws.com/project-4-bucket/Falling+Snowflakes.mp4";
      case "thunderstorm":
      return "https://s3.amazonaws.com/project-4-bucket/lightning02.mp4";
      case "rain":
      return "https://s3.amazonaws.com/project-4-bucket/rain.mp4";
      case "sun":
      return "https://s3.amazonaws.com/project-4-bucket/Footage+Of+Sunlight.mp4";
    }
  }

  render() {
    return(
      <div id='rain'>

      <CSSTransitionGroup
      transitionName="example"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}>
        <video autoPlay muted loop className="video">
          <source src={this.renderVideo("clouds")} type="video/mp4"/>
        </video>
      </CSSTransitionGroup>
      </div>
    )
  }
}

export default Rain;
