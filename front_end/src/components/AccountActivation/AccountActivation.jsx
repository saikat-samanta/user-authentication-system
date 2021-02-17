import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function AccountActivation() {
  const { id } = useParams();
  const [response, setResponse] = useState("");
  const [isActivate, setIsActivate] = useState(false);

  useEffect(() => {
    Axios.post(`http://localhost:5000/account-activate/${id}`)
      .then((res) => {
        setResponse(res.data.msg);
        setIsActivate(true);
      })
      .catch((err) => {
        setResponse(err.response.data.msg);
      });
  }, [id]);

  return (
    <div>
      {isActivate ? (
        <p>
          {response}. go to <Link to="/login">login</Link> page
        </p>
      ) : (
        <p>{response}</p>
      )}
    </div>
  );
}

export default AccountActivation;
