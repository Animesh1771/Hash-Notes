import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import "./add_upd.css";

const UpdateNotes = () => {
  const date = new Date();
  const userID = localStorage.getItem("userid");
  const titles = localStorage.getItem("title");
  const notes = localStorage.getItem("desc");
  const nid = localStorage.getItem("nid");
  // const _id = localStorage.getItem("nid");
  const [desc, setDesc] = useState(notes);
  const [title, setTitle] = useState(titles);
  const handleChange1 = (event) => {
    setTitle(event.target.value);
  };
  //   console.log(desc);

  // const handleupdateNotes = async () => {
  //   if (title.length !== 0 && desc.length !== 0) {
  //     const response = await fetch(`http://localhost:8090/update/${nid}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         title,
  //         desc,
  //         date,
  //         userID,
  //       }),
  //     });
  //     const json = await response.json();
  //     console.log(json);
  //     window.localStorage.removeItem("title");
  //     window.localStorage.removeItem("nid");
  //     window.localStorage.removeItem("desc");
  //     window.location.href = "/Notepage";
  //     //   setTitle("");
  //   }
  // };

  const handleupdateNotes = async () => {
    fetch(`http://localhost:8090/deletenote/?id=${nid}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handlePostNotes();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
      window.localStorage.removeItem("title");
      window.localStorage.removeItem("nid");
      window.localStorage.removeItem("desc");
      window.location.href = "/Notepage";
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
export default UpdateNotes;
