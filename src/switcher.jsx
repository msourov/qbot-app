import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./home";
import Other from "./other";
import ReTest from "./retest";
import popdRetest from "./popdRetest";

const Switcher = () => {
  return (
    <Switch>
      <Route exact path="/path1" component={Home} />
      <Route exact path="/path2/:state?" component={ReTest} />
      <Route exact path="/path3" component={Other} />
      <Route exact path="/path4/:state?" component={popdRetest} />
      <Redirect from="/" exact to="/path1" />
    </Switch>
  );
};

export default Switcher;
