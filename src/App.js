import logo from './logo.svg';
import './App.css';
import React from "react";
import Map from "./map"
import DataMg from "./DataMg"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
function App() {
  return (
    <>
    <Router>
    <Switch>
      {/* <Route path="/about">
        <About />
      </Route> */}
      <Route path="/datamg">
        <DataMg />
      </Route>
      <Route path="/">
        <Map />
      </Route>
    </Switch>
   </Router>
    </>
  );
}
export default App;