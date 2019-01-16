import React, { Component } from "react";
import "./style.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      weather_data: "",
      search_city: "",


    };
    this.getWeatherData = this.getWeatherData.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearSearchCity = this.clearSearchCity.bind(this);
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
clearSearchCity(){
  this.setState({search_city: ''});
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
  render() {
    const data = this.state.weather_data
    const weather = this.state.weather_data.weather;
    return <div className="App">
    <div>
    <div className="weather-info">
    <p>City: {data.city}</p>
    <p>Temperature: {data.temp}</p>
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

      {
      this.state.weather_data.temp < 45 ? <div className="cold">Damn that's cold. Bundle up!</div>:<div className="hot">Wow, soooo hotttt.</div>
      }
      </div>
    </div>;
  }
}

export default App;
