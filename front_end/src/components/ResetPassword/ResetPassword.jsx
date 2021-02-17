import Axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { id } = useParams();
  const [inputField, setInputField] = useState({
    password: "",
    cpassword: "",
  });
  const [responseData, setResponseData] = useState("");

  function inputChange(ev) {
    const { name, value } = ev.target;
    setInputField({ ...inputField, [name]: value });
  }
  function formSubmit(ev) {
    ev.preventDefault();
    Axios.post(`http://localhost:5000/reset-password/${id}`, inputField)
      .then((res) => {
        setResponseData(res.data.msg);
      })
      .catch((err) => {
        setResponseData(err.response.data.msg);
      });
  }

  return (
    <div>
      {responseData ? <small>{responseData}</small> : null}
      <form onSubmit={formSubmit} method="post">
        <div className="input_area">
          <label htmlFor="password">password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter new password"
            value={inputField.password}
            onChange={inputChange}
            required
          />
        </div>
        <div className="input_area">
          <label htmlFor="cpassword">Confirm Password:</label>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            placeholder="confirm password"
            value={inputField.cpassword}
            onChange={inputChange}
            required
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default ResetPassword;
