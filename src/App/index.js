import React, { Component } from "react";
import "./style.css";
import Nav from '../Nav';
import Search from '../Search';
import ForecastTile from '../ForecastTile';

class App extends Component {
  constructor() {
    super();
    this.state = {
      weather_data: "",
      weather_data_forecast: "",
      active_side: false,


    };
    this.getWeatherDataCity = this.getWeatherDataCity.bind(this);
    this.getWeatherDataZip = this.getWeatherDataZip.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.tempSwitch = this.tempSwitch.bind(this);
    this.cloudSwitch = this.cloudSwitch.bind(this);
    this.toggleSlide = this.toggleSlide.bind(this);
  }

  async getWeatherDataCity(search_city, search_country) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search_city},${search_country}&units=imperial&APPID=a9b642fb3a8d9dfcdcba6d7fd229a545`)
    .then((response) => {
      if(response.ok){
      return response.json();
    }else{
      throw new Error(`Request rejected with status ${response.status}`)}
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
    // getWeatherData();
    // clearSearch();
    // const { newTestSubmitAction } = this.props;

    // const { thing2, thing3, ...good } = this.state
  }

  //  componentDidMount() {
  //   this.getWeatherData();
  // }

  tempSwitch() {
    const temp = this.state.weather_data.temp
  switch(true) {
    case (temp < 32):
      return <div>Freezing!!</div>;
    case (temp < 45):
      return <div>Pretty cold dude!</div>;
    case (temp < 60):
      return <div>Light jacket perhaps?!</div>;
    case (temp < 75):
      return <div>Man oh man is it nice! Sweet!</div>;
    case (temp < 90):
      return <div>Time for some shorts!</div>;
    case (temp > 90 ):
      return <div>That's just too damn hot! AC time!</div>;
    default:
      return null;
  }
}

cloudSwitch() {
    const clouds = this.state.weather_data.clouds
  switch(true) {
    case (clouds < 10):
      return <div>Look at all the sky!</div>;
    case (clouds < 30):
      return <div>A few clouds up there</div>;
    case (clouds < 50):
      return <div>Half clouds Half sky</div>;
    case (clouds < 80):
      return <div>That's a bunch of clouds!</div>;
    case (clouds > 80):
      return <div>Damn! So many clouds! No sky!</div>;
    default:
      return null;
  }
}

toggleSlide() {
  if(this.state.active_side === false){
    this.setState({
      active_side: true,
    });
  } else {
    this.setState({
      active_side: false,
    })
  }
}

  render() {
    const data = this.state.weather_data
    const forecast = this.state.weather_data_forecast
    const { active_side } = this.state;

    const formattedDate = new Date(data.date*1000).toLocaleDateString("en-US")
    const formattedSunset = new Date(data.sunset*1000).toLocaleTimeString("en-US")
    const formattedSunrise = new Date(data.sunrise*1000).toLocaleTimeString("en-US")

  

    // Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
// var date = new Date(data.time*1000);
// Hours part from the timestamp
// var hours = date.getHours();
// // Minutes part from the timestamp
// var minutes = "0" + date.getMinutes();
// // Seconds part from the timestamp
// var seconds = "0" + date.getSeconds();

// // Will display time in 10:30:23 format
// var formattedTime = hours + ':' + minutes.substr(-2);
// console.log(formattedTime);

    return <div className="App">
    <Nav/>
    
    <button onClick={this.toggleSlide}>Toggle</button>
    
    {this.state.weather_data.length < 1 ? '' : <div className="weather-info">
    
    <div>
    <p>City: {data.city}</p>
    <p>Date: {formattedDate}</p>
    <p>Sunrise: EST {formattedSunrise}</p>
    <p>Sunset: EST {formattedSunset}</p>
    </div>
    <div>
    <p>Temperature: {data.temp} °F</p>
    <p>Clouds: {data.clouds} %</p>
    <p>Weather: {data.weather}</p>
    <p>Description: {data.weather_description}</p>
    </div>

    </div>}
    
      {/* <div className="weather-scene">
      {this.tempSwitch()}
      {this.cloudSwitch()}
      </div> */}
      <div className="forecast">
      <ForecastTile forecast={forecast}/>
      </div>
      <Search toggle={this.toggleSlide} active={active_side} getWeatherDataCity={this.getWeatherDataCity} getWeatherDataZip={this.getWeatherDataZip}/>
    </div>;
  }
}

export default App;
