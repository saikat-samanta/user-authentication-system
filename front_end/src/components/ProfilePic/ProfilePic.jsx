import Axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";

function ProfilePic() {
  const [profilePic, setProfilePic] = useState();
  const [resMessage, setResMessage] = useState("");

  function readFile(ev) {
    setProfilePic(ev.target.files[0]);
  }

  function submitData(ev) {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("avatar", profilePic);
    Axios.post("http://localhost:5000/profile-pic", formData, {
      headers: {
        "X-custom-Auth_token": Cookies.get("auth_token"),
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        setResMessage(res.data.msg);
      })
      .catch((err) => {
        setResMessage(err.response.data.msg);
      });
    setProfilePic(null);
  }

  return (
    <div>
      {resMessage ? <small>{resMessage}</small> : null}
      <form onSubmit={submitData}>
        <input
          type="file"
          name="avatar"
          onChange={readFile}
          accept="image/jpeg, image/png"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProfilePic;
