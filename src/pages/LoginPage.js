import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const configuration = {
      method: "post",
      url: "http://localhost:4000/login",
      data: {
        username,
        password,
      },
    };

    axios(configuration)
      .then((result) => {
        console.log(result);
        cookie.set("TOKEN", result.data.token, {
          path: "/",
        });
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
}
