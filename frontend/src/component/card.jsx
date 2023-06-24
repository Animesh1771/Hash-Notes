// import React from "react";
// import "../css/card.css";

// export const Card = ({ note, id }) => {
//   const handleDelete = () => {
//     fetch(`http://localhost:8090/delete/?id=${id}`, {
//       method: "DELETE",
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//     window.location.href = "/todo";
//   };
//   return (
//     <div className="card" align="center">
//       <div align="center">
//         <h2>{note}</h2>
//         <button onClick={handleDelete}>remove</button>
//       </div>
//     </div>
//   );
// };

import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteIcon from "@mui/icons-material/Delete";

export const Card = ({ note, id }) => {
  const handleDelete = () => {
    fetch(`http://localhost:8090/delete/?id=${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    window.location.href = "/todo";
  };
  return (
    <div className="adip">
      <div className="adi">
        <h3>{note}</h3>
        {/* <FontAwesomeIcon icon={faTrash} onClick={handleDelete} className="delbut"/> */}
        {/* <icon={faTrash} onClick={handleDelete} className="delbut"/> */}
        <DeleteIcon onClick={handleDelete} className="delbut" />
      </div>
    </div>
  );
};
