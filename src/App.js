import React, {lazy, Suspense } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
const Play = lazy(()=> import('./components/quiz/Play'));
const QuizSummary = lazy(() => import('./components/quiz/QuizSummary'));
const Home = lazy(()=> import('./components/Home'));
const Instructions = lazy(()=> import('./components/Instructions'));




const App = () => {
  return (
    <div>
        <Router>
          <Switch>
          <Suspense fallback={<div className='spinner'> <h3>Loading... </h3></div>}>
          <Route path="/" exact component={Home} />
          <Route path="/play/instructions" exact component={Instructions}/>
          <Route path="/play/quiz" exact component={Play} />           
          <Route path="/play/summary" exact component={QuizSummary} />
          </Suspense>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
