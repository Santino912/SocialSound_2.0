import React, { useRef, useState } from "react";
import { useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  nextTrack,
  previousTrack,
  setStoredTracks,
  togglePlay,
} from "../../redux/features/player/playerGetSlice";
import defaultImg from "./default.png";
import s from "./Player.module.css";
import Queue from "./Queue/Queue";
import { Box } from "@mui/material";

function Player() {
  const [showPlayer, setshowPlayer] = useState(false);
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const tracks = useSelector((state) => state.player.tracks);
  const playerRef = useRef();
  const location = useLocation();
  const { currentTrackIndex } = useSelector((state) => state.player);
  useEffect(() => {
    isPlaying
      ? playerRef.current?.audio.current.play()
      : playerRef.current?.audio.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    return () => {};
  }, []);
  const handlePlay = () => {
    !isPlaying && dispatch(togglePlay());
  };

  const handlePause = () => {
    isPlaying && dispatch(togglePlay());
  };

  const [musicTracks, setMusicTracks] = useState([]);

  useEffect(() => {
    if (tracks?.length) {
      let tracksCopy = [...tracks];
      let stringTracks = JSON.stringify(tracksCopy);
      localStorage.setItem("tracks", stringTracks);
    } else {
      let persistentTracks = localStorage.getItem("tracks");
      let parsedTracks = JSON.parse(persistentTracks);
      parsedTracks?.length && dispatch(setStoredTracks(parsedTracks));
    }

    setMusicTracks(tracks);
  }, [tracks]);

  const handleClickPrevious = () => {
    if (tracks?.length <= 1) return;
    dispatch(nextTrack());
  };

  const handleClickNext = () => {
    if (tracks?.length <= 1) return;
    dispatch(previousTrack());
  };

  return (
    <Box className={s.container}>
      {document.documentElement.clientWidth > "600" &&
        document.documentElement.clientHeight > "600" &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/home/sucess" &&
        !location.pathname.includes("admin") &&
        !showPlayer && (
          <motion.div
            drag
            dragConstraints={{ top: -700, right: 0, bottom: 0, left: -850 }}
            className={
              location.pathname !== "/" ? s.playerContainer : s.playerNone
            }
          >
            <img
              src={
                musicTracks?.length && musicTracks[currentTrackIndex]?.cover
                  ? musicTracks[currentTrackIndex].cover
                  : defaultImg
              }
              style={{ backgroundColor: "black" }}
              alt="MusicImg"
            />
            <div className={s.songInfo}>
              <Queue tracks={musicTracks} trackIndex={currentTrackIndex} />
              <h3>
                {musicTracks?.length
                  ? musicTracks[currentTrackIndex].title
                  : ""}
              </h3>
              <AudioPlayer
                className="player-a"
                ref={playerRef}
                key={"23dg26ah21"}
                style={{ borderRadius: "1rem" }}
                autoPlay={false}
                preload={"false"}
                src={
                  musicTracks?.length && musicTracks[currentTrackIndex].content
                }
                showSkipControls={true}
                showJumpControls={false}
                onClickPrevious={() => handleClickPrevious}
                onClickNext={() => handleClickNext}
                onPlay={() => handlePlay}
                onPause={() => handlePause}
              />
            </div>
          </motion.div>
        )}
    </Box>
  );
}

export default Player;
