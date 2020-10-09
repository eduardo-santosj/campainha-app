import React, {Component} from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton } from '../actions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Containers
import { Home } from '../containers/home'
import { Zap } from '../containers/zap'
import { VivaReal } from '../containers/viva-real'
import { Details } from '../containers/house-details'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/zap">
              <Zap />
            </Route>
            <Route path="/house/:id">
              <Details />
            </Route>
            <Route path="/viva-real">
              <VivaReal/>
            </Route>
            <Route path="/"> 
              <Home/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickButton }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);