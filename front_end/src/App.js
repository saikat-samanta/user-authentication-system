import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Signup from "./components/Signup/Signup";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import AccountActivation from "./components/AccountActivation/AccountActivation";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";
import Secret from "./components/Secret/Secret";
import ProfilePic from "./components/ProfilePic/ProfilePic";
import HomePage from "./components/HomePage/HomePage";

function App() {
  const [isCookies, setIsCookies] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar prop={{ isCookies, setIsCookies }} />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/account-activate/:id">
            <AccountActivation />
          </Route>
          <Route exact path="/login">
            <Login prop={{ isCookies, setIsCookies }} />
          </Route>
          <Route exact path="/forget-password">
            <ForgetPassword />
          </Route>
          <Route exact path="/reset-password/:id">
            <ResetPassword />
          </Route>
          <Route exact path="/secret">
            <Secret />
          </Route>
          <Route exact path="/profilepic">
            <ProfilePic />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
