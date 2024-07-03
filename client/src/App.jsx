import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home/Home';

const App = () => {
  return (
    // <Router>
    //   <Switch>
    //     <Route exact path="/" component={Home} />
    //     <Route path="/about" component={About} />
    //     <Route path="/contact" component={Contact} />
    //     <Route path="/upload" component={UploadSign} />
    //   </Switch>
    // </Router>
    <div>
      <Home />
    </div>
  );
};

export default App;