import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../css/addnote.css";

const AddNotes = () => {
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const date = new Date();
  const userID = localStorage.getItem("userid");
  const handleChange1 = (event) => {
    setTitle(event.target.value);
  };

  const handlePostNotes = async () => {
    if (title.length !== 0 && desc.length !== 0) {
      const response = await fetch("http://localhost:8090/createnote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc,
          date,
          userID,
        }),
      });
      const json = await response.json();
      console.log(json);
      window.location.href = "/Notepage";
      // setTitle("");
    }
  };

  return (
    <div className="hellonotes">
      <input
        type="text"
        value={title}
        onChange={handleChange1}
        placeholder="Title"
        className="titlearea"
      />
      <div className="notebody">
        <ReactQuill
          theme="snow"
          value={desc}
          placeholder="write your notes here....."
          onChange={setDesc}
          className="quillarea"
        />
      </div>
      <span>
        <button
          className="savenotesbut"
          onClick={()=>(window.location.href = "/Notepage")}
          style={{ marginRight: "20px" }}
        >
          back
        </button>

        <button className="savenotesbut" onClick={() => handlePostNotes()}>
          save
        </button>
      </span>
    </div>
  );
};
export default AddNotes;
