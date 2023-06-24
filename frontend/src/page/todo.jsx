// import React, { useState } from "react";
// import { Navbar } from "../component/navbar";
// import { Card } from "../component/card";
// import "../css/todo.css";

// export const Todo = () => {
//   const userID = localStorage.getItem("userid");
//   const [arr, setArr] = useState([]);
//   const [title, setTitle] = useState("");
//   const [a, setA] = useState(0);
//   const submit = (el) => {
//     el.preventDefault();
//   };

//   const handlePut = async () => {
//     const response = await fetch("http://localhost:8090/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title,
//         userID,
//       }),
//     });
//     const json = await response.json();
//     console.log(json);
//     setTitle("");
//     getData();
//     // console.log(json);
//   };
//   const getData = async () => {
//     const response = await fetch(
//       `http://localhost:8090/showtodo/?userID=${userID}`
//     );
//     const json = await response.json();
//     setArr(json);
//   };
//   if (a === 0) {
//     getData();
//     setA(1);
//   }

//   return (
//     <div className="todoq">
//       <Navbar />
//       <div className="todo">
//         <h1>What's the palne for Today?</h1>
//         <div className="todoadd" align="center">
//           <form onSubmit={submit}>
//             <input
//               type="text"
//               placeholder="Add a todo"
//               value={title}
//               name="text"
//               className="todo-input"
//               onChange={(e) => setTitle(e.target.value)}
//             />
//             <button className="todo-b" onClick={handlePut}>
//               Add todo
//             </button>
//           </form>
//         </div>
//         <div className="task">
//           {arr.map((el) => {
//             return (
//               <div>
//                 <Card note={el.title} id={el._id} />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { Navbar } from "../component/navbar";
import { Card } from "../component/card";
import "../css/todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faPencil } from "@fortawesome/free-solid-svg-icons";

export const Todo = () => {
  const userID = localStorage.getItem("userid");
  const [arr, setArr] = useState([]);
  const [title, setTitle] = useState("");
  const [a, setA] = useState(0);
  const submit = (el) => {
    el.preventDefault();
  };

  const handlePut = async () => {
    const response = await fetch("http://localhost:8090/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        userID,
      }),
    });
    const json = await response.json();
    console.log(json);
    setTitle("");
    getData();
    // console.log(json);
  };
  const getData = async () => {
    const response = await fetch(
      `http://localhost:8090/showtodo/?userID=${userID}`
    );
    const json = await response.json();
    setArr(json);
  };
  if (a === 0) {
    getData();
    setA(1);
  }

  return (
    <div className="todoq">
      <Navbar />
      <div className="todo">
        <h1>What's the plan for today?</h1>

        <div className="todocard">
          <form onSubmit={submit}>
            <div className="input-container">
              <FontAwesomeIcon
                icon={faPencil}
                className="input-icon"
                style={{ height: "30px" }}
              />
              <input
                type="text"
                placeholder="Add a todo"
                value={title}
                name="text"
                className="todo-input"
                onChange={(e) => setTitle(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faCirclePlus}
                onClick={handlePut}
                style={{ height: "30px" }}
                className="todo-b"
              />
            </div>
          </form>

          <div className="todocont">
            {arr.map((el) => {
              return (
                <div>
                  <Card note={el.title} id={el._id} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};