import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Form, Header, Modal, Progress } from "semantic-ui-react";
import { db, storage } from "../firebase";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, collection } from "@firebase/firestore";

function Navbar() {
  const [show, setShow] = React.useState(false);
  const [file, setFile] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const storage = getStorage();

  const handleSubmit = (e) => {
    e.preventDefault();
    //   console.log(file);
    if (!file) {
      return window.alert("Please add an image ");
    }
    setOpen(false);

    const uploadFileRef = ref(storage, `image/${file.name}`);
    const uploadTask = uploadBytesResumable(uploadFileRef, file);
    uploadTask.on(
      "state_change",
      (snapshot) => {
        const Newprogress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Newprogress);
      },

      (err) => {
        console.log(err);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        let address = collection(db, "images");
        await addDoc(address, {
          name: file.name,
          url: url,
          createdAt: new Date(),
        });
        setProgress(0);
      }
    );
  };
  return (
    <>
      <AppBar
        position="static"
        style={{ background: "#b2102f" }}
        sx={{ padding: "10px" }}
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Firegram
          </Typography>
          <Modal
            open={open}
            trigger={
              <Button basic inverted color="yellow" size="large">
                Upload
              </Button>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header
              icon="archive"
              content={progress ? "Uploading....." : "Upload an Image Please"}
            />
            <Modal.Content>
              {progress ? (
                <Progress percent={progress} inverted color="red" progress />
              ) : (
                <Form onSubmit={handleSubmit}>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/png,image/jpg,image/jpeg"
                  ></input>
                  <button type="submit">Submit</button>
                </Form>
              )}
            </Modal.Content>
          </Modal>
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Navbar;
