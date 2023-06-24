import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import "@fontsource/roboto/500.css";

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { color } from "@mui/system";

//new
import Box from "@mui/material/Box";
import Modal, { modalClasses } from "@mui/material/Modal";
import Draggable from "react-draggable";
import Paper from "@mui/material/Paper";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
//new end

const NoteCard = ({ note, deletedata }) => {
  //
  //for modal

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //
  // const [areequalornot,setareequalornot] = useState(false);

  //for server time
  const timestamp = note.date; // Example timestamp in UTC

  const date = new Date(timestamp);
  const istDateString = date.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const istTimeString = date.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "numeric",
  });

  const formattedDate = `Last edited on ${istDateString}`;
  const formattedTime = `Last edited at ${istTimeString}`;

  //for current time
  const currentTimestamp = Date.now();

  const currentDate = new Date(currentTimestamp);
  const isttDateString = currentDate.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //for current time
  const date1 = new Date(isttDateString);

  //for server time
  const date2 = new Date(istDateString);

  const areEqual = date1.getTime() === date2.getTime();

  const [opendialog, setopendialog] = useState(false);
  const navigate = useNavigate();

  //modal open

  const handleClick = async () => {
    await deletedata(note._id);
    setopendialog(false);
  };
  const handleEdit = () => {
    // console.log("hello");
    localStorage.setItem("title", note.title);
    localStorage.setItem("desc", note.desc);
    localStorage.setItem("nid", note._id);
    navigate("/Updatenote"); // Navigate to "/create" route
  };

  const cardopener = () => {
    console.log("you clicked on it");
  };
  return (
    <div>
      <Card
        elevation={1}
        sx={{
          bgcolor: "D3D3D3",

          maxWidth: "500px",

          // maxWidth: '100',
          // boxShadow: 100,
          borderRadius: 1,
          ":hover": {
            boxShadow: 24,
          },
        }}
      >
        <CardHeader
          action={
            <>
              <IconButton style={{ margin: 0, padding: 8 }} sx={{ p: 1 }}>
                <DeleteIcon onClick={() => setopendialog(true)} />
              </IconButton>
              <IconButton style={{ margin: 0, padding: 8 }}>
                <EditIcon onClick={handleEdit} />
              </IconButton>
            </>
          }
          title={note.title}
        />

        <CardContent
          sx={{
            overflowWrap: "break-word",
            wordWrap: "break-word",
            hyphens: "auto",
          }}
          onClick={handleClickOpen}
        >
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{
              fontFamily: "Roboto",
              fontWeight: 500,
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: note.desc }} />
          </Typography>
          <br />
          <Typography variant="p" color="textSecondary">
            {areEqual ? formattedTime : formattedDate}
          </Typography>
        </CardContent>
      </Card>

      <Dialog open={opendialog} onClose={() => setopendialog(false)}>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <DeleteForeverRoundedIcon id="delete-icon" fontSize="large" />{" "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Typography variant="h5">
              Are you sure you want to delete?
            </Typography>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setopendialog(false)}>NeverMind</Button>
          <Button onClick={handleClick}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* for text */}

      {/* <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        
      >
        <DialogTitle style={{ cursor: 'move',
      width: '600px', // Adjust the width as needed
    // whiteSpace: 'nowrap',
      overflow: 'hidden',
    textOverflow: 'ellipsis',
      whiteSpace: 'normal',
    overflowWrap: 'break-word',

    }} id="draggable-dialog-title">
            <Typography variant="h3">
            {note.title}
            </Typography>
          

          
        </DialogTitle>
        <DialogContent sx={{ width: 600, overflow: 'hidden' }}>
          <DialogContentText
            sx={{
              overflowWrap: 'break-word',
              wordWrap: 'break-word',
              hyphens: 'auto',
            }}
          >
          <div dangerouslySetInnerHTML={{ __html: note.desc }} />
          <br/>
          <Typography variant="h5">
          {areEqual ? formattedTime : formattedDate}
          </Typography>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
        
        <CloseRoundedIcon onClick={handleClose} sx={{fontSize: 50, paddingRight: '20px'  }} />
       
        </DialogActions>
        
          {/* <Button autoFocus onClick={handleClose}>
            Close
          </Button> 
         
      
      </Dialog> */}

      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        style={{}}
      >
        <DialogTitle
          style={{
            cursor: "move",
            width: "600px", // Adjust the width as needed
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
            overflowWrap: "break-word",
          }}
          id="draggable-dialog-title"
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Roboto",
              fontWeight: 500,
            }}
          >
            {note.title}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ width: 600 }}>
          <DialogContentText
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "normal",
              overflowWrap: "break-word",
              overflowWrap: "break-word",
              wordWrap: "break-word",
              hyphens: "auto",
              bgcolor: "96AFCD",

              fontFamily: "Roboto",
              fontWeight: 500,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Roboto",
                fontWeight: 300,
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: note.desc }} />
            </Typography>

            <br />
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Roboto",
                fontWeight: 500,
              }}
            >
              {areEqual ? formattedTime : formattedDate}
            </Typography>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <CloseRoundedIcon
            onClick={handleClose}
            sx={{ fontSize: 50, paddingRight: "20px" }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NoteCard;
