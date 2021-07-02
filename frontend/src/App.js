import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Beers from "./components/Beers";
import ReviewsFeed from "./components/ReviewsFeed";
import Splash from "./components/Splash";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import SingleBeer from "./components/SingleBeer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  });

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <Splash />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/beers" exact>
            <Beers />
          </Route>
          <Route path="/beers/:id">
            <SingleBeer />
          </Route>
          <Route path="/reviews">
            <ReviewsFeed />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
