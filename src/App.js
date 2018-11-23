import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Agreement from './components/docs/v1/simple/uk/Agreement';
import PrivacyPolicy from './components/docs/v1/simple/uk/PrivacyPolicy';
import NotFound from './components/pages/NotFound';
import Home from "./components/pages/Home";
import './App.css';

class App extends Component {
  render() {
    return (
        <Router>
            <div className="App">
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/v1/uk/simple/agreement/:id" component={Agreement} />
                        <Route exact path="/v1/uk/simple/privacy-policy/:id" component={PrivacyPolicy} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
  }
}

export default App;
