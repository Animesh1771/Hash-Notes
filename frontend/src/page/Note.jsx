import * as React from "react";
import "@fontsource/roboto/500.css";

import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Masonry from "react-masonry-css";
import NoteCard from "../component/NoteCard";
import { Container, flexbox } from "@mui/system";
//SEARCH BAR
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

//new imports
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import InventoryTwoToneIcon from "@mui/icons-material/InventoryTwoTone";
import { Paper, grid2Classes } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

//SEARCH FUNCTION
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 28,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  left: 0, // Updated to place the search icon on the left side
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`, // Modified padding side
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "45ch",
      "&:focus": {
        width: "75ch",
      },
    },
  },
}));

export default function NotesPage() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const [notesdata, setnotesdata] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //newdelete

  //newdelete

  //

  // userid from local storage

  const userId = window.localStorage.getItem("userid");

  // userid from local storage

  //  const getData = async () => {
  //   const response = await fetch(
  //     `http://localhost:8090/shownote/?userID=${userID}`
  //   );
  //   const json = await response.json();
  //   setArr(json);
  // };

  const getData = async () => {
    const response = await fetch(
      `http://localhost:8090/shownote/?userID=${userId}`
    );
    const json = await response.json();
    setnotesdata(json);
    console.log(notesdata);
    console.log("hello");
  };

  const deletedata = (id) => {
    fetch(`http://localhost:8090/deletenote/?id=${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getData();
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any errors
      });
  };

  //   await fetch(`http://localhost:8090/shownote/?userID=${userId}`)
  //  .then((res)=>res.json())
  //  .then((data) => {

  //   const bookdata = data.notesdata;
  //   setnotesdata(bookdata);
  // });
  //}

  useEffect(() => {
    getData();
    console.log(notesdata);
  }, []);

  const menuItems = [
    {
      textt: "Home",
      icon: <HomeIcon color="secondary" />,
      path: "/Home",
    },
    {
      textt: "Create Note",
      icon: <AddCircleOutlinedIcon color="secondary" />,
      path: "/Addnote",
    },
    {
      textt: "ToDolist",
      icon: <InventoryTwoToneIcon color="secondary" />,
      path: "/Todo",
    },
  ];

  const [norecord, setnorecord] = useState(false);

  const keys = ["title", "desc"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };
  const logout = () => {
    localStorage.removeItem("userid");
    window.location.href = "/Home";
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          bgcolor: "#96AFCD",
          minHeight: "100vh",
          marginTop: "10px",
        }}
      >
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ backgroundColor: "Black" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon sx={{ backgroundColor: "black" }} />
            </IconButton>
            {/* <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography> */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                sx={{}}
              />
            </Search>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} sx={{ bgcolor: "red" }}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {menuItems.map((text, index) => (
              <ListItem
                key={text.textt}
                selected={true}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => navigate(text.path)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      transition: "transform 0.3s",
                      m: 2,
                      "&:hover": {
                        transform: "scale(1.2)", // Increase the scale value as desired
                      },
                    }}
                    onClick={() => navigate(text.path)}
                  >
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text.textt}
                    sx={{ opacity: open ? 1 : 0, paddingLeft: 2 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List>
            <ListItem selected={true} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  mt: -2, // Apply negative margin to remove the white space
                }}
                onClick={logout}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    transition: "transform 0.3s",
                    m: 2,
                    // '&:hover': {
                    //   transform: 'scale(1.2)', // Increase the scale value as desired
                    // },
                  }}
                  // onClick={}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"logout"}
                  sx={{ opacity: open ? 1 : 0, paddingLeft: 2 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "96AFCD" }}>
          {/* <DrawerHeader />
       

      </Box>

      <Box> */}
          <Container maxWidth="xl" sx={{ paddingTop: "60px" }}>
            <Masonry
              breakpointCols={breakpoints}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {search(notesdata).length === 0 ? (
                <>
                  <Typography
                    variant="h1"
                    sx={{
                      color: "#4338ca",
                      textAlign: "center",
                      pt: 9,
                      pl: 68,

                      fontFamily: "Roboto",
                      fontWeight: 500,
                    }}
                  >
                    Notes not found
                  </Typography>
                </>
              ) : (
                search(notesdata).map((note) => (
                  <div item key={note.nid}>
                    <NoteCard note={note} deletedata={deletedata} />
                  </div>
                ))
              )}
            </Masonry>
          </Container>
        </Box>
      </Box>
    </div>
  );
}
