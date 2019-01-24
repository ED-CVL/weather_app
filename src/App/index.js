import React, { Component } from "react";
import "./style.css";
import Search from '../Search';

class App extends Component {
  constructor() {
    super();
    this.state = {
      weather_data: "",
      search_city: "",
      active_side: false,


    };
    this.getWeatherData = this.getWeatherData.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.tempSwitch = this.tempSwitch.bind(this);
    this.cloudSwitch = this.cloudSwitch.bind(this);
    this.toggleSlide = this.toggleSlide.bind(this);
  }

  async getWeatherData() {
    const city = this.state.search_city
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=a9b642fb3a8d9dfcdcba6d7fd229a545`)
    .then(response => response.json())
    .then((data) => {
        this.setState({
          weather_data: {
            city: data.name,
            temp: data.main.temp,
            temp_high: data.main.temp_max,
            temp_low: data.main.temp_min,
            humidity: data.main.humidity,
            weather: data.weather[0].main,
            weather_description: data.weather[0].description,
            wind_speed: data.wind.speed,
            clouds: data.clouds.all,
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
    console.log(event);
    event.preventDefault();
    this.getWeatherData();
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
    const data = this.state.weather_data;
    const { active_side } = this.state;
    return <div className="App">
    <div>
    <button onClick={this.toggleSlide}>Toggle</button>
    <div className="weather-info">
      <p>City: {data.city}</p>
      <p>Temperature: {data.temp}</p>
      <p>Clouds: {data.clouds}</p>
      <p>Weather: {data.weather}</p>
      <p>Description: {data.weather_description}</p>
    </div>
    <form>
        <p>Find Weather</p>
        <div className="field">
          <label className="label">City Name</label>
          <div>
            <input onChange={this.updateSearch} id="city_input" name="city" className="input" type="text" value={this.state.search_city} placeholder="eg. Chicago" />
          </div>
        </div>
        <div>
          <button type="submit" value="Submit" onClick={this.handleSubmit}>Submit</button>
        </div>
      </form>
      </div>
      <div className="weather-scene">
      {this.tempSwitch()}
      {this.cloudSwitch()}
      </div>
      <Search toggle={this.toggleSlide} active={active_side}/>
    </div>;
  }
}

export default App;
