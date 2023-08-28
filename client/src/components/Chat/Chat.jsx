import React, { useEffect, useState } from "react";
import s from "./Chat.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  getUserByFirebaseId,
} from "../../redux/features/users/usersGetSlice";
import {
  doc,
  getDoc,
  getDocFromServer,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context";
import Conversations from "./Conversations/Conversations";
import { changeUserChat } from "../../redux/features/chat/chatGetSlice";
import Input from "./Input/Input";
import Messages from "./Messages/Messages";
import { useNavigate } from "react-router-dom";
import { Arrow } from "../componentsIcons";
import Loading from "../loading/Loading";
import { chatFunction } from "./utils";
import { Autocomplete, Avatar, Box, TextField } from "@mui/material";

function Chat() {
  const dispatch = useDispatch();
  const [showConversationMenu, setShowConversationMenu] = useState(false);
  const { userFirebase } = useAuth();
  const users = useSelector((state) => state.users.usersListAll);
  const currentUser = useSelector((state) => state.users.currentUser);
  const destination = useSelector((state) => state.chat.destination);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser?._id) {
      dispatch(getUserByFirebaseId(userFirebase?.uid));
    }
    dispatch(getUser());
    chatFunction(userFirebase);
  }, []);

  const handleOnSelect = async (e) => {
    const user = users.find((u) => u.name === e.target.value);
    if (!user?.name) return;
    const combinedId =
      currentUser.idGoogle > user.idGoogle
        ? currentUser.idGoogle + user.idGoogle
        : user.idGoogle + currentUser.idGoogle;
    dispatch(changeUserChat({ destination: user, chatId: combinedId }));
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userConversations", currentUser.idGoogle), {
          [combinedId + ".userInfo"]: {
            uid: user.idGoogle,
            displayName: user.name,
            photoURL: user.avatar,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userConversations", user.idGoogle), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.idGoogle,
            displayName: currentUser.name,
            photoURL: currentUser.avatar,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showConversations = () => {
    setShowConversationMenu(!showConversationMenu);
  };

  return (
    <div className={s.wholeContainer}>
      <div
        className={s.showConversationsContainer}
        onClick={() => showConversations()}
      />
      <div
        className={
          showConversationMenu && document.documentElement.clientWidth <= 768
            ? s.conversationsResponsive
            : s.conversations
        }
      >
        <div className={s.convHead}>
          <button className={s.goBack} onClick={() => navigate(-1)}>
            <Arrow />
          </button>
          <h2 className={s.convTitle}>Messages</h2>
          <Autocomplete
            sx={{
              Input: { color: "white" },
              fieldset: { borderColor: "white" },
              padding: "5px 2px",
            }}
            options={users?.map((user) => user?.name)}
            onSelect={handleOnSelect}
            disableClearable
            freeSolo
            renderInput={(params) => (
              <TextField {...params} label="Search User" />
            )}
          />
        </div>
        {currentUser?.name ? (
          <div className={s.scrollConv}>
            <Conversations />
          </div>
        ) : (
          <div className={s.loading}>
            <Loading width="50px" height="50px" />
          </div>
        )}
      </div>
      {currentUser?.name && destination?.name ? (
        <div className={s.chatContainer}>
          <div className={s.receiver}>
            <img
              className={s.recPc}
              width={"50px"}
              src={destination.avatar}
              alt="avatar chat"
            />
            <h4>{destination.name}</h4>
          </div>
          <div className={s.messagesContainer}>
            <Messages />
          </div>
          <div className={s.mCont}>
            <Input />
          </div>
        </div>
      ) : (
        <div className={s.chatContainer}>
          <div className={s.receiver}></div>
          <div className={s.messagesContainer}></div>
          <div className={s.mCont}></div>
        </div>
      )}
    </div>
  );
}

export default Chat;
