let React = require('react');
let ReactRouter = require('react-router-dom');
let Router = ReactRouter.BrowserRouter;
let Route = ReactRouter.Route;
let Switch = ReactRouter.Switch;
let DailyWeather = require('./DailyWeather');
require.context('../images', true, /\.svg$/);

let Main = require('./Main');
let Header = require('./Header');
let Forecast = require('./Forecast');

//Order of events in a component:
//state
//life cycle events
//UI

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header
            header='React Weather'
            getWeather='Get Weather'
          />
          <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path='/forecast' component={Forecast} />
            <Route path='/details' component={DailyWeather} />
          </Switch>
        </div>
      </Router>
    )
  }
}

module.exports = App;