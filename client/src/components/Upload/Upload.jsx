import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  MenuItem,
  Select,
  Button,
  OutlinedInput,
  TextField,
  Dialog,
  DialogActions,
  useMediaQuery,
  DialogContent /* , DialogTitle */,
  Alert,
  Box,
} from "@mui/material";
import { createPost } from "../../redux/features/post/postGetSlice";
import AudioPlayer from "react-h5-audio-player";
import { storage } from "../../firebase.js";
import Loading from "../loading/Loading";
import defaultImg from "../Player/default.png";
import s from "./Upload.module.css";
import AddIcon from "@mui/icons-material/Add";

import "react-h5-audio-player/lib/styles.css";
import { handleErrors, handleErrorsBoolean } from "./utils";

export default function Upload() {
  const currentUser = useSelector((state) => state.users.currentUser);
  const genres = useSelector((state) => state.genres.genreList);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState({
    content: false,
  });
  const [postData, setPostData] = React.useState({
    title: "",
    description: "",
    content: "",
    type: "",
    genres: [],
  });
  const [dataErrors, setDataErrors] = useState({
    title: "",
    description: "",
    content: "",
    type: "",
    genres: "",
  });

  const uploadMusic = async (file) => {
    setLoading({ ...loading, content: true });
    const fileRef = ref(storage, `content/${file.name + Math.random()}`);
    return uploadBytes(fileRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        setLoading({ ...loading, content: false });
        return url;
      });
  };

  const handleChange = async (event) => {
    const {
      target: { value, name },
    } = event;
    name === "content"
      ? setPostData({
          ...postData,
          [name]: await uploadMusic(event.target.files[0]),
          type: event.target.files[0].type.split("/")[0],
        })
      : name === "genres"
      ? setPostData({
          ...postData,
          genres: typeof value === "string" ? value.split(",") : value,
        })
      : setPostData({ ...postData, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(e) {
    //hacer errores en el front y back
    e.preventDefault();

    if (handleErrorsBoolean(postData)) {
      setDataErrors(handleErrors(postData));
      setInterval(() => {
        setDataErrors({
          title: "",
          description: "",
          content: "",
          type: "",
          genres: "",
        });
      }, 5000);
      return;
    }

    dispatch(createPost({ ...postData, idUser: currentUser._id }));
    setPostData({
      title: "",
      description: "",
      content: "",
      type: "",
      genres: [],
    });
    setOpen(false);
  }

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        backgroundColor: "transparent",
        borderRadius: "15px",
        color: "white",
      },
    },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className={s.allContainer}>
      <button className={s.newPostBtn} onClick={handleClickOpen}>
        <AddIcon />
        New Post...
      </button>
      <Dialog
        className={s.dialog}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <h2 className={s.title}>New Post</h2>
        <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
          <DialogContent className={s.content} id="content">
            <ul className={s.formInputs}>
              <li>
                <TextField
                  className={s.titleInput}
                  value={postData.title}
                  name="title"
                  onChange={handleChange}
                  id="standard-basic"
                  label="Song title"
                  variant="standard"
                  sx={{ input: { color: "white" } }}
                  disabled={loading.content}
                  required
                />
              </li>
              <li>
                <TextField
                  value={postData.description}
                  onChange={handleChange}
                  name="description"
                  className={s.description}
                  id="standard-multiline-static"
                  label="Description"
                  multiline
                  rows={6}
                  variant="standard"
                  inputProps={{ style: { color: "white" } }}
                  disabled={loading.content}
                />
              </li>
              <li>
                <Select
                  className={s.selectGenres}
                  name="genres"
                  multiple
                  color="customOne"
                  displayEmpty
                  value={postData.genres}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected?.length === 0) {
                      return <em>Select Genres *</em>;
                    }
                    return selected.join(", ");
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                  disabled={loading.content}
                >
                  <MenuItem disabled value="">
                    <em>Select Genres</em>
                  </MenuItem>
                  {genres.map((genre) => (
                    <MenuItem key={genre.name} value={genre.name}>
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </li>
              <li className={s.fileContainer}></li>

              <div className={s.playerContainer}>
                <label htmlFor="song">
                  {loading.cover ? (
                    <div className={s.loadingContainer}>
                      <Loading height={"50px"} width={"50px"} />
                    </div>
                  ) : (
                    <div className={s.songCover}>
                      <img src={defaultImg} alt="CoverImg" />
                      <div className={!postData?.cover ? s.addImg : s.addNone}>
                        <AddIcon />
                      </div>
                    </div>
                  )}

                  <input
                    disabled={loading.content}
                    onChange={(e) => handleChange(e)}
                    type="file"
                    id="song"
                    name="content"
                    accept="audio/mp3, video/mp4"
                  />
                </label>
                <div className={s.songInfo}>
                  <h3>{postData?.title ? postData.title : "Song title"}</h3>
                  {loading.content ? (
                    <div className={s.songLoading}>
                      <Loading height={"50px"} width={"50px"} />
                    </div>
                  ) : (
                    <div>
                      <AudioPlayer
                        style={{ borderRadius: "1rem" }}
                        autoPlay={false}
                        preload={"false"}
                        key={Math.random()}
                        src={postData?.content}
                        showSkipControls={false}
                        showJumpControls={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            </ul>
            <Box className={s.containerAlert}>
              {dataErrors?.genres && (
                <Alert severity="error">{dataErrors?.genres}</Alert>
              )}
              {dataErrors?.content && (
                <Alert severity="error">{dataErrors?.content}</Alert>
              )}
              {dataErrors?.title && (
                <Alert severity="error">{dataErrors?.title}</Alert>
              )}
              {dataErrors?.type && (
                <Alert severity="error">{dataErrors?.type}</Alert>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              className={s.buttonSc}
              autoFocus
              color="customOne"
              onClick={handleClose}
              disabled={loading.content}
              endIcon={
                loading.content && <Loading width={"10px"} height={"10px"} />
              }
            >
              Cancel
            </Button>
            <Button
              className={s.buttonSc}
              type="submit"
              color="customOne"
              disabled={loading.content}
              endIcon={
                loading.content && <Loading width={"10px"} height={"10px"} />
              }
            >
              Post
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
