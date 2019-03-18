import React, { Component } from "react";
import './style.css';
import { CSSTransitionGroup } from 'react-transition-group';

class Rain extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.renderVideo = this.renderVideo.bind(this);
  }


renderVideo(weather){
  console.log(weather);
  switch(true) {
    // case (desc.includes("overcast")|| desc.includes("scattered")):
    //   return <FontAwesomeIcon className="overcast-icon" icon="cloud-sun"/>;
    case (weather.includes("clear")):
      return <video key="1" autoPlay muted loop className="video">
      <source src="https://s3.amazonaws.com/project-4-bucket/Footage+Of+Sunlight.mp4" type="video/mp4"/></video>;
    case (weather.includes("rain")|| weather.includes("drizzle")||weather.includes("mist")):
      return <video key="2" autoPlay muted loop className="video">
      <source src="https://s3.amazonaws.com/project-4-bucket/rain.mp4" type="video/mp4"/></video>;
    case (weather.includes("snow")):
      return <video key="3" autoPlay muted loop className="video">
      <source src="https://s3.amazonaws.com/project-4-bucket/Falling+Snowflakes.mp4" type="video/mp4"/></video>;
    case (weather.includes("cloud")):
      return <video key="4" autoPlay muted loop className="video">
      <source src="https://s3.amazonaws.com/project-4-bucket/Pexels+Videos+3611.mp4" type="video/mp4"/></video>;
    case (weather.includes("thunder")):
      return <video key="5" autoPlay muted loop className="video">
      <source src="https://s3.amazonaws.com/project-4-bucket/lightning02.mp4" type="video/mp4"/></video>;
    default:
      return null;
  }}
  render() {
    const weather = this.props.weather < 1? "" : this.props.weather.weather_description;
    return(
      this.props.weather < 1? "" : <div id='rain'>

      <CSSTransitionGroup
      transitionName="example"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}>
      {this.renderVideo(weather)}
      </CSSTransitionGroup>
      </div>
    )
  }
}

export default Rain;
