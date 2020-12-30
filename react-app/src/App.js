import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
  const [currentUser, setCurrentUser] = useState({})
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        setCurrentUser(user)
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
        />
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
      <ProtectedRoute path="/start" exact={true} authenticated={authenticated}>
        <NewProject />
      </ProtectedRoute>
      <ProtectedRoute path='/project/:id' exact={true} authenticated={authenticated} user={currentUser}>
        <ProjectProfile />
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
