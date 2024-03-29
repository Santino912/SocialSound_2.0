import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Typography, Button, Modal, Box } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import logo from "../../images/logoicon.png";
import Upload from "../Upload/Upload";
import ButtonSupport from "../buttonSupport/ButtonSupport";
import { useAuth } from "../../context";
import PayButton from "../pay/PayButton";
import { KeyIcon } from "../componentsIcons";
import { getUserByFirebaseId } from "../../redux/features/users/usersGetSlice";
import LikedSongsSvg from "../../images/svg/LikedSongsSvg";
import LikedVideosSvg from "../../images/svg/LikedVideosSvg";
import LogoutSvg from "../../images/svg/LogoutSvg";
import s from "./SideBar.module.css";
import { getGenres } from "../../redux/features/genres/genreGetSlice";
import { setConversation } from "./utils/chatFunct";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditProfile from "../ProfilePage/EditProfile";

const SideBar = () => {
  const user = useSelector((state) => state.users.currentUser);
  const navigate = useNavigate();
  const { logout, userFirebase } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    setConversation(userFirebase);
  }, [dispatch, userFirebase]);

  useEffect(() => {
    dispatch(getUserByFirebaseId(userFirebase?.uid, logout));
    dispatch(getGenres());
  }, []);

  const [openBoolean, setOpenBoolean] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [checkedSideBar, setCheckedSideBar] = useState(false);

  const handleCloseModal = () => setOpenModal(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleCheckedSideBar = (e) => {
    setCheckedSideBar(!checkedSideBar);
  };

  return (
    <Box
      className={
        checkedSideBar && document.documentElement.clientWidth < 900
          ? s.sideBarResponsive
          : s.sideBar
      }
    >
      <ul className={s.routescontainer}>
        <img
          width={"70px"}
          height={"50px"}
          alt="logo"
          src={logo}
          onClick={() => handleCheckedSideBar()}
        />
        <Box className={s.profileItem}>
          <Link to={`/home/explore/${user._id}`}>
            <img
              className={s.profilePic}
              width={"40px"}
              alt="profile"
              src={user?.avatar}
            />
          </Link>
          <Box className={s.nameWithPremium}>
            <h4 className={s.nameSideBar}>{user?.name}</h4>
            {user?.plan === "Premium" && (
              <h5 className={s.premiumText}>Premium</h5>
            )}
          </Box>
          {user?.plan === "Premium" && (
            <MoreHorizIcon
              onClick={() => setOpenBoolean(!openBoolean)}
              className={s.dotsMenu}
            />
          )}
        </Box>

        <li className={s.routeItem}>
          <Link to="/home">Home</Link>{" "}
        </li>

        <li className={s.routeItem}>
          <Link to="/home/explore">Explore</Link>{" "}
        </li>

        <li className={s.routeItem}>
          <Link to="/messages">Messages</Link>
        </li>

        <li className={s.routeItem}>
          <Link to="/home/notification">
            Notifications
            {user?.notifications?.filter((noti) => !noti?.watched)?.length >
              0 && (
              <Badge
                badgeContent={
                  user?.notifications?.filter((noti) => !noti?.watched)?.length
                }
                color="secondary"
              >
                <MailIcon color="action" sx={{ paddingLeft: 1 }} />
              </Badge>
            )}
          </Link>
        </li>

        {user?.plan !== "Premium" ? (
          <li className={s.buttonPremium}>
            <PayButton />
          </li>
        ) : (
          <Box>
            <Button
              id="demo-positioned-button"
              className={s.cancelPremiumButton}
              aria-controls={openBoolean ? "demo-positioned-menu" : undefined}
              aria-haspopup={true}
              aria-expanded={openBoolean ? true : undefined}
              onClick={() => setOpenModal(true)}
            >
              Cancel Premium
            </Button>
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Are you sure to cancel the premium plan?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Confirm now and you will lose all premium features!
                </Typography>
              </Box>
            </Modal>
          </Box>
        )}
      </ul>
      <ul className={s.optionsContainer}>
        <h4 className={s.titleItem}>MY COLLECTION</h4>
        <Link to="/home/likedSongs">
          <li className={s.optionItem}>
            <LikedSongsSvg /> Liked Songs{" "}
          </li>
        </Link>
        <Link to="/home/likedVideos">
          <li className={s.optionItem}>
            <LikedVideosSvg /> Music Videos
          </li>
        </Link>
      </ul>
      <ul className={s.optionsContainer}>
        <h4 className={s.titleItem}>ME</h4>
        <li className={s.optionItem}>
          <Upload />
        </li>
        <li className={s.optionItem}>
          <ButtonSupport />
        </li>

        <li
          className={s.optionItem}
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <LogoutSvg />
          Logout
        </li>
        {user?.role === "Admin" && (
          <li className={s.optionItem} onClick={() => navigate("/admin")}>
            <KeyIcon /> Admin
          </li>
        )}
      </ul>
      {openBoolean && <EditProfile setSettings={setOpenBoolean} />}
    </Box>
  );
};

export default SideBar;
