import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { getSongsLikesByUserId } from "../../redux/features/like/likeGetSlice";
import CardVideo from "./CardVideo";
import PlayAllButton from "../PlayAllButton/PlayAllButton";
import style from "./likedVideos.module.css";
import { clearLikes } from "../../redux/features/like/likeSlice";
import Loading from "../loading/Loading";

export default function LikedVideos() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userDB = useSelector((state) => state.users.currentUser);
  const likesCurrentUser = useSelector(
    (state) => state.likes.likesPostsCurrentUser
  );

  useEffect(() => {
    dispatch(getSongsLikesByUserId(userDB._id, "video", setLoading));

    return () => {
      dispatch(clearLikes());
    };
  }, [userDB]);

  return (
    <Box className={style.likedVideos}>
      <Box className={style.sideBarSpace} />
      <Box className={style.likesUserContainer}>
        {loading || likesCurrentUser === undefined ? (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ height: "100%" }}
          >
            <Loading width={"5vw"} />
          </Box>
        ) : likesCurrentUser?.length > 0 ? (
          <Box style={{ width: "100%" }}>
            <Box style={{ width: "55px" }}>
              <PlayAllButton songs={likesCurrentUser} />
            </Box>
            <Box style={{ marginTop: "30px" }}>
              {likesCurrentUser?.map((post, index) => (
                <CardVideo
                  key={index}
                  post={post}
                  index={index}
                  allPosts={likesCurrentUser}
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
