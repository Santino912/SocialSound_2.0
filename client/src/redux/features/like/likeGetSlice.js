import axios from "axios";
import { getUserLikesSlice } from "./likeSlice";

export const getSongsLikesByUserId = (_id, type, setLoading) => {
  return async (dispatch) => {
    try {
      if (_id === undefined) return;
      const { data } = await axios.get(`/likes/user/${type}/${_id}`);
      dispatch(getUserLikesSlice(data));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
};
