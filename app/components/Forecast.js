let React = require('react');
var queryString = require('query-string');
let getWeather = require('../utils/api');
let Loading = require('./Loading');
let kelvinToFahrenheit = require('kelvin-to-fahrenheit');
let PropTypes = require('prop-types');

const FiveDay = (props) => {
  return (
    <h2 className='five-day-h2'>5 Day Forecast for {props.city}</h2>
  )
}

FiveDay.propTypes = {
  city: PropTypes.string.isRequired
}

const ErrorPage = (props) => {
  return (
    <h2 className='five-day-h2'>Looks like that isn't a city... Try again.</h2>
  )
}

class Forecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      data: null,
      loading: true,
      oneDay: false,
      error: null
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let cityQuery = queryString.parse(this.props.location.search);
    let city = cityQuery.city;
    
    getWeather(city)
      .then((data) => {
        let weatherData = [];

        data.list.filter((weather) => {
          return weather;
        }).filter((list) => {
          let lowTemp = parseInt(kelvinToFahrenheit(list.temp.min));
          let highTemp = parseInt(kelvinToFahrenheit(list.temp.max));
          let humidity = list.humidity;
          let timestamp = new Date(list.dt * 1000).toString().slice(0, 10);

          return list.weather.filter((res) => {
            weatherData.push({
              weatherIcons: res.icon,
              weatherMain: res.main,
              forecastDate: timestamp,
              description: res.description,
              humidity: humidity,
              low: lowTemp,
              high: highTemp
            })
          })
        })
      this.setState(() => {
        return {
          city: data.city.name,
          data: weatherData,
          loading: false
        }
      });
    }).catch((err) => {
      this.setState(() => {
        return {
          error: 'looks like there is an error...'
        }
      })
      
    })
  }
  handleClick(index, event) {
    this.props.history.push({
      pathname: '/details/' + this.state.city,
      state: {
        data: this.state.data[index],
        oneDay: true,
        name: this.state.city
      }
    })
  }
  render() {
    let loading = this.state.loading;
    let weatherDataFiveDay = this.state.data;
    let error = this.state.error;
    
    if(loading === true && error === null) {
      return <Loading />
    }

    if(error !== null) {
      return <ErrorPage />
    }

    if(weatherDataFiveDay !== null){
      return (
        <div className='weather-container'>
        <FiveDay city={this.state.city} />
          <div className='weather'>
          {weatherDataFiveDay.map((item, index) => {
            return (
              <div key={index} onClick={this.handleClick.bind(this, index)}>
                <li>
                  <img 
                    alt='weather icon' 
                    src={'../app/images/weather-icons/' + item.weatherIcons + '.svg'}
                  />
                </li>
                <li>
                  {item.forecastDate}
                </li>
                <li>
                  {item.weatherMain}
                </li>
              </div>
          )})
        }</div>
      </div>
      )
    }
  }
}

module.exports = Forecast;