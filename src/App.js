import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/Home';
import Instructions from './components/Instructions';
import Play from './components/quiz/Play';
import QuizSummary from './components/quiz/QuizSummary'

const App = () => {
  return (
    <div>
        <Router>
          <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/play/instructions" exact component={Instructions}/>
          <Route path="/play/quiz" exact component={Play} /> 
          <Route path="/play/summary" exact component={QuizSummary} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
