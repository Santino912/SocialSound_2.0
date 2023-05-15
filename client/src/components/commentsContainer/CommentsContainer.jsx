import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserNotification } from "../../utils";
import Comment from "../comment/Comment";
import style from "./commentsContainer.module.css";

export default function CommentsContainer({ post }) {
  const currentUser = useSelector((state) => state.users.currentUser);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState();
  const dispatch = useDispatch();

  const notification = async () => {
    if (currentUser._id !== post.user._id) {
      await dispatch(
        createUserNotification({
          content: `${currentUser?.username} commented on your post`,
          userId: post.user._id,
          fromUser: currentUser._id,
          idPost: post._id,
        })
      );
      console.log("notification created!");
    }
  };
  const handleComment = async () => {
    if (comment) {
      await axios.post("/comments", {
        content: comment,
        idPost: post._id,
        idUser: currentUser._id,
      });
      setComment("");
    }

    await getComments();
    await notification();
  };

  async function getComments() {
    const res = await axios.get(`/comments/${post._id}`);
    setComments(res.data);
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Box className={style.commentsContainer}>
      <Grid item container className={style.inputContainer}>
        <TextField
          placeholder="Add a comment..."
          variant="outlined"
          size="small"
          value={comment}
          className={style.input}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          className={style.addButton}
          variant="contained"
          onClick={handleComment}
        >
          Add
        </Button>
      </Grid>
      <Grid item mt={`2%`}>
        {comments?.length > 0
          ? comments
              ?.slice(0)
              ?.reverse()
              ?.map((comment, i) => (
                <Comment
                  key={i}
                  content={comment.content}
                  userId={comment.userId}
                  commentId={comment._id}
                  getComments={async () => await getComments()}
                  currentUser={currentUser}
                  post={post}
                />
              ))
          : ""}
      </Grid>
    </Box>
  );
}
