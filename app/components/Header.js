let React = require('react');
let GetLocation = require('./GetLocation');
var Link = require('react-router-dom').NavLink;

let styles = {
  content: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    margin: '20px 10px 20px 10px'
  },
  button: {
    marginLeft: '10px',
  }
}

class Header extends React.Component {
  render() {
    return (
      <nav className='navbar'>
      <Link to={{
        pathname: '/'
      }}
      >
        <h2>{this.props.header}</h2>
      </Link>
        <GetLocation
          style={styles.content}
          buttonStyle={styles.button}
          getWeather='Get Weather'
        />
      </nav>
    )
  }
}

module.exports = Header;