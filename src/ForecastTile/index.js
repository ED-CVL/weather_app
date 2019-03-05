import React, { Component } from "react";
import "./style.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudShowersHeavy, faSnowflake, faWind, faCloud, faCloudSun, faBolt } from '@fortawesome/free-solid-svg-icons';

library.add(faSun,faCloudShowersHeavy, faSnowflake, faWind, faCloud, faCloudSun, faBolt);

class ForecastTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      expandedKey: ""
    };

    this.chunk = this.chunk.bind(this);
    this.expand = this.expand.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  chunk() {
    //Sliced the array bc first 1 were for the current day. Wanted the next day for 5 day
    const forecast =
      this.props.forecast.length < 1
        ? ""
        : this.props.forecast.forecast.slice(1);
    const chunked = [];

    for (let element of forecast) {
      const last = chunked[chunked.length - 1];

      !last || last.length === 8 ? chunked.push([element]) : last.push(element);
    }

    return chunked;
  }

  expand(arr) {
 
    const timeMap = arr.map((time, i) => {
      let icon = ()=> {
        let desc = time.weather[0].description
        switch(true) {
        case (desc.includes("overcast")|| desc.includes("scattered")):
          return <FontAwesomeIcon className="overcast-icon" icon="cloud-sun"/>;
        case (desc.includes("clear")):
          return <FontAwesomeIcon className="sunny-icon" icon="sun"/>;
        case (desc.includes("rain")):
          return <FontAwesomeIcon className="rain-icon" icon="cloud-showers-heavy"/>;
        case (desc.includes("snow")):
          return <FontAwesomeIcon className="snow-icon" icon="snowflake"/>;
        case (desc.includes("cloud")):
          return <FontAwesomeIcon className="clouds-icon" icon="cloud"/>;
        case (desc.includes("thunder")):
          return <FontAwesomeIcon className="thunder-icon" icon="bolt"/>;
        default:
          return null;
      }}

      return (
        <div className="subTile">
          {/* <p>Date: {time.dt_txt.slice(5, 10)}</p> */}
          <p>{time.dt_txt.slice(11, 16)}</p>
          <p>{icon()}</p>
          <p>{Math.floor(time.main.temp)} °F</p>
          {/* <p>{time.weather[0].main}</p> */}
          <p>{time.weather[0].description}</p>
        </div>
      );
    });

    return timeMap;
  }
  toggleExpand(key) {
    // console.log(key);
    this.setState({ expandedKey: key });
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  render() {
    const chunkedArr = this.chunk();
    const fiveDayForecast = chunkedArr.map((day, i) => {
      return (
        <a href={`#${i}`}>
        <div
          onClick={e => this.toggleExpand({ i })}
          key={i}
          id={i}
          day={day}
          className="forecastTile"
        >
          <p className="date">Date:{day[0].dt_txt.slice(5, 10)}</p>
          {/* <p>{day[0].main.temp} °F</p> */}
          {/* <p>{day[0].weather[0].description}</p> */}
  
          {/* {this.state.expanded === true ? this.expand(day) : ""} */}
          {this.state.expanded === true && this.state.expandedKey.i === i
            ? this.expand(day)
            : ""}
        </div>
        </a>
      );
    });
    return (
      <div className="fiveDayForecast">
      {this.props.forecast ? <h1 className="forecast-heading">5 Day Forecast</h1> : ""}
        {fiveDayForecast}
      </div>
    );
  }
}

export default ForecastTile;
