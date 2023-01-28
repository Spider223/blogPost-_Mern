import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { UserContext } from "./UserContext";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

export default function Header() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    const configuration = {
      method: "get",
      url: "http://localhost:5000/profile",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(configuration)
      .then((result) => {
        // setUsername(result.data.user.username);
        // console.log(result.data.user.username);
        setUserInfo(result);
      })
      .catch((error) => {
        error = new Error("error");
      });
  }, [setUserInfo]);

  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    navigate("/");
    console.log("logout");
    setUserInfo(null);
  };

  const username = userInfo?.data?.user?.username;

  return (
    <header>
      <Link to="/" className="logo">
        My Logo
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create</Link>
            <Link onClick={logout}>Logout</Link>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
