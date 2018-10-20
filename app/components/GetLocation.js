let React = require('react');
let PropTypes = require('prop-types');
let getWeather = require('../utils/api');
var NavLink = require('react-router-dom').NavLink;
let Forecast = require('./Forecast')

class GetLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      data: null,
      loading: true,
      error: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    let value = event.target.value;

    this.setState(() => {
      return {
        city: value,
      }
    })

    console.log(value);
  }
  handleSubmit() {
    this.setState(() => {
      return {
        city: ''
      }
    })
  }
  reloadScreen() {
    location.reload();
  }
  render() {
    let currentCity = this.state.city;

    return (
      <form style={this.props.style}>
        <input 
          type='text' 
          placeholder='Dover, New Jersey' 
          value={this.state.city}
          onChange={this.handleChange}
        />
        <NavLink to={{
          pathname: '/forecast',
          search: '?city=' + currentCity
        }}
        onClick={this.handleSubmit}
        >
          <button
            style={this.props.buttonStyle}
            type='submit'
            disabled={!this.state.city}
            onClick={this.reloadScreen}
          >
          Get Weather
          </button>
        </NavLink>
      </form>
    )
  }
}

module.exports = GetLocation;