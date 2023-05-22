import {
  next,
  previous,
  add,
  remove,
  set,
  toggle,
  change,
  setStored,
  setTrack,
} from "./playerSlice";

export const nextTrack = () => {
  return (dispatch) => {
    dispatch(next());
  };
};

export const previousTrack = () => {
  return (dispatch) => {
    dispatch(previous());
  };
};

export const addTrack = (track) => {
  return (dispatch) => {
    dispatch(add(track));
  };
};

export const removeTrack = (track) => {
  return (dispatch) => {
    dispatch(remove(track));
  };
};

export const setTracks = (tracks) => {
  return (dispatch) => {
    dispatch(set(tracks));
  };
};

export const setOneTrack = (track) => {
  return (dispatch) => {
    dispatch(setTrack(track));
  };
};

export const togglePlay = () => {
  return (dispatch) => {
    dispatch(toggle());
  };
};

export const changeIndex = (i) => {
  return (dispatch) => {
    dispatch(change(i));
  };
};

export const setStoredTracks = (tracks) => {
  return (dispatch) => {
    dispatch(setStored(tracks));
  };
};
