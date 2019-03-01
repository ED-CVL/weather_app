import React, { Component } from "react";
import "./style.css";

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
    const forecast =
      this.props.forecast.length < 1
        ? ""
        : this.props.forecast.forecast;
    const chunked = [];

    for (let element of forecast) {
      const last = chunked[chunked.length - 1];

      !last || last.length === 8 ? chunked.push([element]) : last.push(element);
    }

    return chunked;
  }

  expand(arr) {
 
    const timeMap = arr.map((time, i) => {
      return (
        <div className="subTile">
        <div className="subTile-date"> 
          <p>Date: {time.dt_txt.slice(5, 10)}</p>
          <p>Time: {time.dt_txt.slice(11, 16)}</p>
        </div>
        <div className="subTile-description">
        <p>Temperature: {time.main.temp} °F</p>
          {/* <p>{time.weather[0].main}</p> */}
          <p>{time.weather[0].description}</p>
        </div>
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
          <p>Date:{day[0].dt_txt.slice(5, 10)}</p>
          <p>{day[0].main.temp} °F</p>
          <p>{day[0].weather[0].description}</p>
  
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
        {fiveDayForecast}
      </div>
    );
  }
}

export default ForecastTile;