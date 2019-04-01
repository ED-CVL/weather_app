import React, { Component } from "react";
import "./style.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudShowersHeavy, faSnowflake, faWind, faCloud, faCloudSun } from '@fortawesome/free-solid-svg-icons';
import Nav from '../Nav';
import Search from '../Search';
import ForecastTile from '../ForecastTile';
import Rain from '../Rain';
import { CSSTransitionGroup } from 'react-transition-group';

library.add(faSun,faCloudShowersHeavy, faSnowflake, faWind, faCloud, faCloudSun);
class App extends Component {
  constructor() {
    super();
    this.state = {
      weather_data: "",
      weather_data_forecast: "",
      expanded: false


    };
    this.getWeatherDataCity = this.getWeatherDataCity.bind(this);
    this.getWeatherDataZip = this.getWeatherDataZip.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSearchExpand = this.toggleSearchExpand.bind(this);
  }

  async getWeatherDataCity(search_city, search_country) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search_city},${search_country}&units=imperial&APPID=a9b642fb3a8d9dfcdcba6d7fd229a545`)
    .then((response) => {
      if(!response.ok){
        throw new Error(`Request rejected with status ${response.status}`)
    }else{
      return response.json();
    }
    })
    .then((data) => {
        this.setState({
          weather_data: {
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            temp_high: data.main.temp_max,
            temp_low: data.main.temp_min,
            humidity: data.main.humidity,
            weather: data.weather[0].main,
            weather_description: data.weather[0].description,
            wind_speed: data.wind.speed,
            clouds: data.clouds.all,
            date: data.dt,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
          },
        });
      }).catch((e)=> console.log(e));
      // 5 day forecast  api.openweathermap.org/data/2.5/forecast?q={city name},{country code}

      fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${search_city},${search_country}&units=imperial&APPID=a9b642fb3a8d9dfcdcba6d7fd229a545`)
    .then(response => response.json())
    .then((data) => {
        this.setState({
          weather_data_forecast: {
            forecast: data.list
          },
        });
      });

  }

  async getWeatherDataZip(search_zip, search_country) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${search_zip},${search_country}&units=imperial&APPID=a9b642fb3a8d9dfcdcba6d7fd229a545`)
    .then(response => response.json())
    .then((data) => {
        this.setState({
          weather_data: {
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            temp_high: data.main.temp_max,
            temp_low: data.main.temp_min,
            humidity: data.main.humidity,
            weather: data.weather[0].main,
            weather_description: data.weather[0].description,
            wind_speed: data.wind.speed,
            clouds: data.clouds.all,
            date: data.dt,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
          },
        });
      });
  }


updateSearch(event){
  const self = this;
  self.setState({search_city: event.target.value});
}

 handleSubmit(event) {
    event.preventDefault();
    this.getWeatherDataCity();
    this.setState({search_city: ''});
  }

  toggleSearchExpand() {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  render() {
    const data = this.state.weather_data
    const forecast = this.state.weather_data_forecast

    const formattedDate = new Date(data.date*1000).toLocaleDateString("en-US")
    const formattedSunset = new Date(data.sunset*1000).toLocaleTimeString("en-US")
    const formattedSunrise = new Date(data.sunrise*1000).toLocaleTimeString("en-US")

    return <div className="App">
    <Nav getWeatherDataCity={this.getWeatherDataCity}/>

    {/* <button onClick={this.toggleSlide}>Toggle</button> */}
    <div className="main-section">
    <Search getWeatherDataCity={this.getWeatherDataCity} getWeatherDataZip={this.getWeatherDataZip} expanded={this.state.expanded}/>
    <div className="weather-section">
    {this.state.weather_data.length < 1 ? '' :
    <div className="weather-info">
      <p className="sunrise-time"><strong>Sunrise: </strong>{formattedSunrise.slice(0,4) +" "+ formattedSunset.slice(8,10)} EST</p>
      <div className="weather-info-middle">
        <p className="city-name">{data.city}</p>
        <p>{data.weather_description[0].toUpperCase() + data.weather_description.slice(1)}</p>
        <p className="current-temp">{Math.round(data.temp)} °F</p>
      </div>
      <p className="sunset-time"><strong>Sunset: </strong>{formattedSunset.slice(0,4) + formattedSunset.slice(8,10)} EST</p>
    </div>}

      <div className="forecast">
      <ForecastTile forecast={forecast} toggleSearchExpand={this.toggleSearchExpand}/>
      </div>
      </div>
</div>
      <Rain weather={this.state.weather_data}/>
    </div>;
  }
}

export default App;
