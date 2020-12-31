import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NewProject from "./components/NewProject";
import ProjectProfile from "./components/ProjectProfile";
import { authenticate } from "./services/auth";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        setCurrentUser(user);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    { loaded } && (
      <BrowserRouter>
        <NavBar
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
        <Switch>
          <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
            <h1>SeedFund</h1>
          </ProtectedRoute>
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
            path="/profile"
            exact={true}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          >
            <UserProfile user={currentUser} />
          </ProtectedRoute>
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
            <ProjectProfile user={currentUser} authenticated={authenticated} />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    )
  );
}

export default App;
