import { Box, Button } from "@mui/material";
import React from "react";
import { Arrow } from "../componentsIcons";
import style from "./banned.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context";

const Banned = ({ user }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    return () => {
      logout();
    };
  }, []);

  return (
    <Box className={style.banned}>
      <Button onClick={() => navigate("/")} className={style.arrow}>
        <Arrow />
      </Button>

      <Box className={style.titleContainer}>
        <h1>You account are banned</h1>
      </Box>

      <Box style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <h2 style={{ color: "white" }}>Reason: {user?.reasonBan}</h2>
      </Box>
    </Box>
  );
};

export default Banned;
