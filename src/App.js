import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Home from "./views/Home";
import GeneralInfo from "./views/GeneralInfo";
import NotFound from "./views/NotFound"


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/GeneralInfo" component={GeneralInfo} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
