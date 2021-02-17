import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cookie from "js-cookie";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";

function Login(props) {
  const { isCookies, setIsCookies } = props.prop;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (Cookie.get("auth_token")) {
      setRedirect(true);
    }
  }, []);

  function inputChange(ev) {
    const { name, value } = ev.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  }

  function formSubmit(e) {
    e.preventDefault();
    Axios.post("http://localhost:5000/login", formData)
      .then((res) => {
        const { access_Token, msg } = res.data;
        if (access_Token) {
          Cookie.set("auth_token", access_Token, { expires: 7 });
          setMessage(msg);
          setIsCookies(true);
          setTimeout(() => {
            setRedirect(true);
          }, 1000);
        }
      })
      .catch((err) => {
        setMessage(err.response.data.msg);
      });
    setFormData({
      email: "",
      password: "",
    });
  }

  return (
    <div className="login_form">
      {isCookies ? (
        <>
          <small> {message} </small>
          {redirect ? <Redirect to="/secret" /> : null}
        </>
      ) : null}
      <br />
      <form className="form_area" onSubmit={formSubmit} method="post">
        <div className="input_area">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={inputChange}
            required
          />
        </div>
        <div className="input_area">
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={inputChange}
            required
          />
        </div>
        <button className="submit_btn" type="submit">
          login
        </button>
      </form>
      <p>
        <Link to="/signup">Register</Link> ||{" "}
        <Link to="/forget-password">Forget Password</Link>
      </p>
    </div>
  );
}

export default Login;
