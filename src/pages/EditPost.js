import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("TOKEN");

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];


export default function EditPost() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/post/${id}`)
    .then((result) => {
      console.log(result.data)
      setTitle(result.data.title)
      setSummary(result.data.summary)
      setContent(result.data.content)
    })
  },[id])

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("file", files);

    formData.set('id', id);

    const configuration = {
      method: "put",
      url: "http://localhost:4000/post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    };
    axios(configuration)
      .then((result) => {
        console.log(result);
        if (result) {
          navigate(`/post/${id}`)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  
  }

  
    
  return (
    <form onSubmit={handleSubmit}>
    <input
      type="title"
      placeholder={"Title"}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <input
      type="summary"
      placeholder={"Summary"}
      value={summary}
      onChange={(e) => setSummary(e.target.value)}
    />
    <input type="file" onChange={(e) => setFiles(e.target.files[0])} />
    <ReactQuill
      theme="snow"
      value={content}
      onChange={(newValue) => setContent(newValue)}
      modules={modules}
      formats={formats}
    />
    <button style={{ marginTop: "5px" }}>Update Post</button>
  </form>
);
  
}
