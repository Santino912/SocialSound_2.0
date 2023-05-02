/* eslint-disable react-hooks/exhaustive-deps */

import {
  Stack,
  Typography,
  ListItem,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  Button,
  IconButton,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  disabledUserNotification,
  watchedUserNotification,
} from "../../redux/features/users/usersGetSlice";
import style from "./notification.module.css";

const Notification = () => {
  const dispatch = useDispatch();
  const userNotification = useSelector(
    (state) => state.users.userNotifications
  );
  const userDB = useSelector((state) => state.users.currentUser);
  //usar userdb para notificaciones
  const handleWatched = (post) => {
    if (userNotification) {
      dispatch(watchedUserNotification(post));
    }
  };

  const handleDelete = (i) => {
    if (userNotification) {
      dispatch(
        disabledUserNotification(
          userNotification[i]?._id,
          userNotification[i]?.fromUser
        )
      );
    }
  };

  return (
    <>
      <div className={style.divContainer}>
        <Stack direction="row">
          <div className={style.background}></div>

          <div className={style.sideBarSpace}></div>
          <div className={style.container}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: "600",
                color: "white",
                paddingTop: "20px",
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
              <div className={style.containerDescription}>
                <>
                  {userNotification?.length > 0 ? (
                    userNotification?.map((user, i) => {
                      let data = user;
                      return (
                        <div key={i}>
                          <List className={style.list} sx={{ width: "100%" }}>
                            <ListItemButton>
                              <ListItem className={style.listContainer}>
                                <ListItemAvatar>
                                  <Link to={`/home/explore/${user.fromUser}`}>
                                    <Avatar
                                      sx={{ width: 54, height: 54 }}
                                      alt="avatar.."
                                      src={data?.img}
                                    />
                                  </Link>
                                </ListItemAvatar>
                                <ListItemText
                                  component="div"
                                  primary={
                                    <Stack direction="row">
                                      <Typography
                                        sx={{
                                          display: "inline",
                                          fontSize: 17,
                                          fontWeight: 600,
                                          marginLeft: 2,
                                        }}
                                        component="h4"
                                        variant="body2"
                                        color="#ffffff"
                                      >
                                        <Link
                                          to={`/home/explore/${user.fromUser}`}
                                        >
                                          {" "}
                                          {data?.name}
                                        </Link>
                                        {!user.watched ? (
                                          ""
                                        ) : (
                                          <span className={style.watched}>
                                            watched
                                          </span>
                                        )}
                                      </Typography>
                                    </Stack>
                                  }
                                  secondary={
                                    <>
                                      <Stack>
                                        <Typography
                                          sx={{
                                            display: "inline",
                                            fontSize: 16,
                                            fontWeight: 500,
                                            marginLeft: 2,
                                          }}
                                          component="span"
                                          variant="subtitle1"
                                          color="#757575"
                                        >
                                          {data?.post}{" "}
                                          <Link to={user?.post}>
                                            {user?.content && (
                                              <Button
                                                href="#text-buttons"
                                                variant="outlined"
                                                color="success"
                                                sx={{
                                                  marginLeft: 1,
                                                  color: "#c4c4c4",
                                                  fontSize: 12,
                                                  fontWeight: 16,
                                                }}
                                                onClick={() =>
                                                  handleWatched(user?.post)
                                                }
                                              >
                                                Post
                                              </Button>
                                            )}
                                          </Link>
                                        </Typography>
                                      </Stack>

                                      <div>
                                        <div style={{ textAlign: "right" }}>
                                          <IconButton
                                            aria-label="delete"
                                            size="large"
                                            color="primary"
                                            sx={{
                                              color: "red",
                                            }}
                                            onClick={() =>
                                              handleDelete(i, user?._id)
                                            }
                                          >
                                            <DeleteIcon fontSize="inherit" />
                                          </IconButton>
                                        </div>
                                        <Typography
                                          sx={{
                                            display: "inline",
                                            fontSize: 12,
                                            textAlign: "right",
                                          }}
                                          component="span"
                                          variant="body2"
                                          color="#757575"
                                        >
                                          {/* {DateTime.fromISO(user.date).toFormat(
                                            "ff"
                                          )} */}
                                        </Typography>
                                      </div>
                                    </>
                                  }
                                />
                              </ListItem>
                            </ListItemButton>
                          </List>
                        </div>
                      );
                    })
                  ) : (
                    <div className={style.divNotNotification}>
                      <h2>You don't have any notification.</h2>
                    </div>
                  )}
                </>
              </div>
            </Stack>
          </div>
        </Stack>
      </div>
    </>
  );
};

export default Notification;
