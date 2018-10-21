let React = require('react');

class DailyWeather extends React.Component {
  render() {
    return (
      <div className='weather-container'>
        <ul>
          <li><img className='daily-img' src={'../app/images/weather-icons/' + this.props.location.state.data.weatherIcons + '.svg'} alt='weather-icon'/></li>
          <li><h2>{this.props.location.state.name}</h2></li>
          <li><h3>{this.props.location.state.data.forecastDate}</h3></li>
          <li>{this.props.location.state.data.description}</li>
          <li>High: {this.props.location.state.data.high}&deg;F</li>
          <li>Low: {this.props.location.state.data.low}&deg;F</li>
          <li>Humidity: {this.props.location.state.data.humidity}%</li>
        </ul>
      </div>
    )
  }
}

module.exports = DailyWeather;