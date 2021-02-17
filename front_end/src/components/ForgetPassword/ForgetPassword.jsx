import React, { useState } from "react";
import Axios from "axios";

function ForgetPassword() {
  const [email, setEmail] = useState({ email: "" });
  const [responseData, setResponseData] = useState("");

  function inputChange(ev) {
    setEmail({ email: ev.target.value });
  }

  function formSubmit(ev) {
    ev.preventDefault();
    Axios.post("http://localhost:5000/forgot-password", email)
      .then((res) => {
        setResponseData(res.data.msg);
      })
      .catch((err) => {
        setResponseData(err.response.data.msg);
      });
    setEmail({ email: "" });
  }

  return (
    <div>
      {responseData ? <small>{responseData}</small> : null}
      <form onSubmit={formSubmit} method="post">
        <div className="input_area">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email.email}
            onChange={inputChange}
            required
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default ForgetPassword;
