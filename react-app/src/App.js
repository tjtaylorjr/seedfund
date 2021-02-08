import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Landing/Home";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NewProject from "./components/Project/NewProject";
import ProjectProfile from "./components/Project/ProjectProfile";
import DiscoverPage from "./components/Search/DiscoverPage";
import DiscoverUsersPage from "./components/Search/DiscoverUsersPage";
import { authenticate } from "./services/auth";
import UserProfile from "./components/UserProfile/UserProfile";
import ProjectEdit from "./components/Project/ProjectEdit";
import Footer from "./components/Footer/Footer";

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
    <div className="page-container">
      <div className="page-wrapper">

        <BrowserRouter>
          <NavBar
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            setCurrentUser={setCurrentUser}
          />
          <Switch>
            <Route path="/" exact={true} authenticated={authenticated}>
              <Home />
            </Route>
            <Route path="/login" exact={true}>
              <LoginForm
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
                setCurrentUser={setCurrentUser}
              />
            </Route>
            <Route path="/signup" exact={true}>
              <SignUpForm
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
                setCurrentUser={setCurrentUser}
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
            <Route path="/project/:id" exact={true} authenticated={authenticated}>
              <ProjectProfile user={currentUser} authenticated={authenticated} />
            </Route>
            <ProtectedRoute
              path="/project/:id/edit"
              exact={true}
              authenticated={authenticated}
            >
              <ProjectEdit />
            </ProtectedRoute>
            <Route path="/discover/:query" exact={true}>
              <DiscoverPage />
            </Route>
            <Route path="/discover/users/:user" exact={true}>
              <DiscoverUsersPage
                user={currentUser}
                authenticated={authenticated}
              />
              <Footer />
            </Route>
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    </div>
  );
}

export default App;
