import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Home from "./components/pages/Home";
import {DocumentPage} from "./components/pages/DocumentPage";
import {DOCUMENT} from "./components/docs/paths";
import './App.css';

class App extends Component {
  render() {
    return (
        <Router>
            <div className="App">
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path={DOCUMENT.route} component={DocumentPage} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
  }
}

export default App;
