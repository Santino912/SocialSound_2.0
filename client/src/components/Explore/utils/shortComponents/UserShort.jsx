import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import style from "../../ShortStyle.module.css";
import { useNavigate } from "react-router-dom";

const UserShort = ({ user }) => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => navigate(`/home/explore/${user?._id}`)}
      className={style.userContainerShort}
    >
      <Box className={style.avatarContainer}>
        <Avatar
          className={style.avatar}
          src={user?.avatar}
          alt={`${user.name} avatar`}
        />
      </Box>

      <Box>
        <Typography variant={"h6"} component={"h6"}>
          {user?.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserShort;
