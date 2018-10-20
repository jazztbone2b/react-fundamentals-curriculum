let React = require('react');
var queryString = require('query-string');
let getWeather = require('../utils/api');
let Loading = require('./Loading');

const FiveDay = (props) => {
  return (
    <h2 className='five-day-h2'>5 Day Forecast for {props.city}</h2>
  )
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
      error: null
    }
  }

  componentDidMount() {
    let cityQuery = queryString.parse(this.props.location.search);
    console.log(cityQuery);
    let city = cityQuery.city;

    console.log(city);
    
    getWeather(city)
      .then((data) => {
        console.log(data);
        let weatherData = [];

        data.list.filter((weather) => {
          return weather;
        }).filter((list) => {
          console.log(list.dt)
          let timestamp = new Date(list.dt * 1000).toString().slice(0, 10);
          return list.weather.filter((res) => {
            weatherData.push({
              weatherIcons: res.icon,
              weatherMain: res.main,
              forecastDate: timestamp
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
      console.log('heyyyyyyyyy ' + err);
      this.setState(() => {
        return {
          error: 'looks like there is an error...'
        }
      })
      
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
      console.log(weatherDataFiveDay);
      
      return (
        <div className='weather-container'>
        <FiveDay city={this.state.city} />
        
          <div className='weather'>
          {weatherDataFiveDay.map((item, index) => {
            return (
            <div>
              <li>
                <img 
                  alt='weather icon' 
                  src={'../app/images/weather-icons/' + item.weatherIcons + '.svg'}
                  key={index + 1}
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