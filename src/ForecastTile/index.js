import React, { Component } from "react";
import "./style.css";

class ForecastTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        expanded: false,
      };

    this.chunk = this.chunk.bind(this);
    this.expand = this.expand.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  chunk() {
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
    
      const timeMap = arr.map((time)=>{
        return (
            <div className="subTile">
              <p>Date:{time.dt_txt.slice(5, 10)}</p>
              {/* <p>Time:{time.dt_txt.slice(11, 16)}</p> */}
              {/* <p>{time.weather[0].main}</p> */}
              <p>{time.weather[0].description}</p>
            </div>
          );  
      })
      
      return timeMap
  }
toggleExpand(){
  this.setState(prevState => ({
    expanded: !prevState.expanded
  }));
}

  render() {
    const chunkedArr = this.chunk();
    console.log(chunkedArr);
    const fiveDayForecast = chunkedArr.map((day, i) => {
      return (
        <div onClick={this.toggleExpand} key={i} day={day} className="forecastTile">
          <p>Date:{day[0].dt_txt.slice(5, 10)}</p>
          {/* <p>Time:{day[0].dt_txt.slice(11, 16)}</p> */}
          {/* <p>{day[0].weather[0].main}</p> */}
          <p>{day[0].weather[0].description}</p>
          {this.state.expanded === true ? this.expand(day) : ''}
        </div>
      );
    });
    return <div className="fiveDayForecast">{fiveDayForecast}</div>;
  }
}

export default ForecastTile;
