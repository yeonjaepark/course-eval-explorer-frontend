import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Home from '../containers/home';
import Course from '../containers/course';

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const App = (props) => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/course/:courseId" component={Course} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
