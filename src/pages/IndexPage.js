import { useEffect, useState } from "react";
import axios from "axios";
import Posts from "../Posts";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/post")
      .then((result) => {
        console.log(result);
        setPosts(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Posts {...post} key={post._id} />)}
    </>
  );
}
