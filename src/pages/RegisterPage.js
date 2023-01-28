import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const configuration = {
      method: "POST",
      url: "http://localhost:5000/register",
      data: {
        username,
        password,
      },
    };

    await axios(configuration)
      .then((result) => {
        console.log(result);
        alert(result.data.message);
      })
      .catch((error) => {
        console.log(error);
        alert("username already exists.");
      });

    // console.log("submitted");
  };
  return (
    <form className="register" onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
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
      <button>Register</button>
    </form>
  );
}
