let React = require('react');

let GetLocation = require('./GetLocation');

let styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginTop: '10px',
  }
}

class Main extends React.Component {
  render() {
    return (
      <div className='main-container'>
        <h1>Enter a City and State</h1>
        <GetLocation
        style={styles.content}
        buttonStyle={styles.button}
        />
      </div>
    )
  }
}

module.exports = Main;