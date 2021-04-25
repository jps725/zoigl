import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Beers from "./components/Beers";
import Reviews from "./components/Reviews";
import About from "./components/About";
import Splash from "./components/Splash";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  });

  return (
    <div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/beers">
            <Beers />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/reviews">
            <Reviews />
          </Route>
          <Route path="/splash">
            <Splash />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
