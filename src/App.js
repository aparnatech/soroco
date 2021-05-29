import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import ListComments from './components/listComment';
import tagsearch from './components/tagsearch';
import GetComments from './components/getComments';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={ListComments} />
          <Route exact path="/users" render={props => <GetComments {...props} />} />
        </div>
      </Router>
    );
  }
}

export default App;