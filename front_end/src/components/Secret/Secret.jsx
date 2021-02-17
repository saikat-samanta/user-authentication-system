import Axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

function Secret() {
  const [isLogin, setIsLogin] = useState(true);
  const [responseData, setResponseData] = useState("");

  useEffect(() => {
    Axios({
      url: "http://localhost:5000/secret",
      method: "post",
      headers: {
        "X-custom-Auth_token": Cookies.get("auth_token"),
      },
    })
      .then((res) => {
        setIsLogin(true);
        setResponseData(res.data.msg);
      })
      .catch((err) => {
        setIsLogin(false);
        setResponseData(err.response.data.msg);
      });
  }, []);

  return (
    <div>
      {isLogin ? (
        <>
          <h1>your document id: {responseData}</h1>
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
}

export default Secret;
