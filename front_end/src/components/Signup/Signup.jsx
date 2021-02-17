import React, { useState } from "react";
import Axios from "axios";

function Signup() {
  const [inputField, setInputField] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [resData, setResData] = useState("");
  const [validationData, setValidationData] = useState("");

  function inputChange(ev) {
    const { name, value } = ev.target;
    setInputField({ ...inputField, [name]: value });
  }
  function validation(ev) {
    const { name, value } = ev.target;
    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regexp.test(value)) {
      setValidationData(
        "please input atleast one upparcase, one lowercase, number and spacial char"
      );
    } else {
      setValidationData("feeling strong");
      setInputField({ ...inputField, [name]: value });
    }
  }

  function formSubmit(ev) {
    ev.preventDefault();
    Axios.post("http://localhost:5000/signup", inputField)
      .then((res) => {
        if (res.data) {
          setResData(res.data.msg);
        }
      })
      .catch((err) => {
        setResData(err.response.data.msg);
      });
    document.getElementById("password").value = "";
    setInputField({
      username: "",
      email: "",
      password: "",
      cpassword: "",
    });
  }

  return (
    <div>
      {resData ? <small>{resData}</small> : null}
      <form onSubmit={formSubmit} method="post">
        <div className="input_area">
          <label htmlFor="username">username:</label>
          <input
            type="username"
            name="username"
            id="username"
            value={inputField.username}
            onChange={inputChange}
            required
          />
        </div>
        <div className="input_area">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={inputField.email}
            onChange={inputChange}
            required
          />
        </div>
        <div className="input_area">
          <label htmlFor="password">password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={validation}
            required
          />
          {validationData !== "" && <small>{validationData}</small>}
        </div>
        <div className="input_area">
          <label htmlFor="cpassword">Confirm Password:</label>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            value={inputField.cpassword}
            onChange={inputChange}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
