/* eslint-disable react-hooks/exhaustive-deps */

import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteNotificationFunc,
  getUserNotification,
  watchedUserNotification,
} from "../../redux/features/users/usersGetSlice";
import style from "./notification.module.css";
import NotificationShort from "./NotificationShort";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../loading/Loading";

const Notification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userNotification = useSelector(
    (state) => state.users.userNotifications
  );
  const userDB = useSelector((state) => state.users.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getUserNotification(userDB?._id, setLoading));
  }, [dispatch, userDB]);

  const handleWatched = (_id, idUser, idPost) => {
    dispatch(watchedUserNotification(_id, idUser));
    navigate(`/home/post/${idPost}`);
  };

  const handleDelete = (_id, idUser, i) => {
    dispatch(deleteNotificationFunc(_id, idUser, i, userNotification));
  };
  return (
    <>
      <Box className={style.divContainer}>
        <Stack direction="row">
          <Box className={style.background}></Box>

          <Box className={style.sideBarSpace}></Box>
          <Box className={style.container}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: "600",
                color: "white",
                paddingTop: "20px",
                fontSize: "calc(15px + 5vw)",
              }}
            >
              Notifications.
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              sx={{ marginTop: "13px" }}
            >
              <Box className={style.containerDescription}>
                <>
                  {loading || userNotification === undefined ? (
                    <Box className={style.divNotNotification}>
                      <Loading width={"5vw"} />
                    </Box>
                  ) : userNotification?.length > 0 ? (
                    userNotification?.map((notification, i) => (
                      <NotificationShort
                        key={i}
                        handleWatched={handleWatched}
                        handleDelete={handleDelete}
                        user={notification?.fromUser}
                        notification={notification}
                        index={i}
                      />
                    ))
                  ) : (
                    <Box className={style.divNotNotification}>
                      <h2>You don't have any notification.</h2>
                    </Box>
                  )}
                </>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Notification;
