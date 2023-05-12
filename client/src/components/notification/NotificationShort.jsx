import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import style from "./notification.module.css";

const NotificationShort = ({
  user,
  handleWatched,
  handleDelete,
  notification,
}) => {
  const navigate = useNavigate();
  return (
    <Box className={style.list}>
      <Box
        sx={{ width: 54, height: 54, cursor: "pointer" }}
        onClick={() => navigate(`/home/explore/${user?._id}`)}
      >
        <Avatar
          sx={{ width: 54, height: 54 }}
          alt={`${user?.username} avatar`}
          src={user?.avatar}
        />
      </Box>

      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        {notification?.watched && (
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 500,
            }}
            component="span"
            variant="subtitle1"
            color="green"
          >
            Watched
          </Typography>
        )}
        <Box textAlign={"center"}>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 500,
            }}
            component="span"
            variant="subtitle1"
            color="#b1b1b1"
          >
            {notification?.content}
          </Typography>

          <Button
            href="#text-buttons"
            variant="outlined"
            color="success"
            sx={{
              marginLeft: 1,
              color: "#ffffff",
              fontSize: 12,
              fontWeight: 16,
            }}
            onClick={() =>
              handleWatched(notification?._id, user?._id, notification?.post)
            }
          >
            Post
          </Button>
        </Box>
      </Box>
      <Box>
        <Box style={{ textAlign: "right" }}>
          <IconButton
            aria-label="delete"
            size="large"
            color="primary"
            sx={{
              color: "red",
            }}
            onClick={() => handleDelete(notification?._id)}
          >
            <DeleteIcon fontSize="medium" />
          </IconButton>
        </Box>
        <Typography
          sx={{
            display: "inline",
            fontSize: 12,
            textAlign: "right",
          }}
          component="span"
          variant="body2"
          color="#757575"
        ></Typography>
      </Box>
    </Box>
  );
};

export default NotificationShort;
