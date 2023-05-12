import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context";
import { Arrow } from "../componentsIcons";
import Post from "../post/Post";
import style from "./postContainer.module.css";
import { getPostById } from "../../redux/features/post/postGetSlice";
import { clearCurrentPost } from "../../redux/features/post/postSlice";

export default function PostContainer() {
  const dispatch = useDispatch();
  const { idPost } = useParams();
  const { userFirebase } = useAuth();
  const post = useSelector((state) => state.posts.post);

  useEffect(() => {
    dispatch(getPostById(idPost));
    return () => {
      dispatch(clearCurrentPost());
    };
  }, [dispatch, userFirebase.uid, idPost]);

  return (
    <Box className={style.backgroundContainer}>
      <Grid container className={style.postContainer}>
        <Grid container>
          <Grid item className={style.back}>
            <Link to="/home">
              <Arrow />
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            className={style.divPost}
            style={post?.type === "audio" ? { height: "100%" } : {}}
          >
            {Object.keys(post)?.length !== 0 ? (
              <Post post={post} comments={true} height={"100%"} />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
