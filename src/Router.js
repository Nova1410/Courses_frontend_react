import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import Course from "./pages/Course"
import Login from "./login/Login"

export default function Routes() {
    return (
        <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/courses" component={Course} exact />
        </Switch>

    )
}