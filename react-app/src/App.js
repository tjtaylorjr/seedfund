import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import NewProject from "./components/NewProject";
import ProjectProfile from "./components/ProjectProfile";
import { authenticate } from "./services/auth";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
      <Switch>
        <Route path="/" exact={true} authenticated={authenticated} component={Home}>
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/signup" exact={true}>
          <SignUpForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <ProtectedRoute
          path="/start"
          exact={true}
          authenticated={authenticated}
        ></ProtectedRoute>
        <ProtectedRoute
          path="/profile"
          exact={true}
          authenticated={authenticated}
        ></ProtectedRoute>
        <ProtectedRoute
          path="/start"
          exact={true}
          authenticated={authenticated}
        >
          <NewProject />
        </ProtectedRoute>
        <ProtectedRoute
          path="/project/:id"
          exact={true}
          authenticated={authenticated}
        >
          <ProjectProfile />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
