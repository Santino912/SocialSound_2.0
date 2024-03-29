import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { getSongsLikesByUserId } from "../../redux/features/like/likeGetSlice";
import { clearLikes } from "../../redux/features/like/likeSlice";
import PlayAllButton from "../PlayAllButton/PlayAllButton";
import CardSong from "./CardSong";
import Loading from "../loading/Loading";
import style from "./likedSongs.module.css";

export default function LikedSongs(_id) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userDB = useSelector((state) => state.users.currentUser);
  const postsLiked = useSelector((state) => state.likes.likesPostsCurrentUser);

  useEffect(() => {
    dispatch(getSongsLikesByUserId(userDB?._id, "audio", setLoading));

    return () => {
      dispatch(clearLikes());
    };
  }, [dispatch]);

  return (
    <Box className={style.likedVideos}>
      <Box className={style.sideBarSpace} />
      <Box className={style.currentLikesContainer}>
        {loading || postsLiked === undefined ? (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ height: "100%" }}
          >
            <Loading width={"5vw"} />
          </Box>
        ) : postsLiked?.length > 0 ? (
          <Box style={{ width: "100%" }}>
            <Box style={{ width: "55px" }}>
              <PlayAllButton songs={postsLiked} />
            </Box>
            <Box className={style.songsContainer}>
              {postsLiked?.map((post, index) => (
                <CardSong
                  arrayMap={postsLiked}
                  post={post}
                  index={index}
                  key={index}
                />
              ))}
            </Box>
          </Box>
        ) : (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ height: "100%" }}
          >
            <p className={style.noLikedSongsText}>No liked songs yet</p>
          </Box>
        )}
      </Box>
    </Box>
  );
}
