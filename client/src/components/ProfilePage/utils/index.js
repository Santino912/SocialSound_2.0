import axios from "axios";

export const followRequest = async (value) => {
  await axios.post(`/follow/create`, value);
};
