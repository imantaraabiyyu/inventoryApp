import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./configs/routes";
import "./App.css";
import Page from "./components/Page";

class App extends Component {
  render() {
    return (
      <Router basename="/webclient">
        <Page>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props) => (
                  <route.component {...props} {...route.props} />
                )}
              />
            ))}
          </Switch>
        </Page>
      </Router>
    );
  }
}

export default App;
