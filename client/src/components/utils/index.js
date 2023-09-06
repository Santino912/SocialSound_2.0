import axios from "axios";

export const userExistGoogle = async (user) => {
  const { data } = await axios
    .post("/user", {
      ...user,
    })
    .catch(function (error) {
      console.log(error);
    });
  return data;
};

export const userExistSignUp = (user, usersDB) => {
  if (user && !usersDB?.some((u) => u.email === user.email)) {
    return axios
      .post("/user", {
        ...user,
      })
      .catch(function (error) {
        return "Ya existe una cuenta con este email";
      });
  }
  return "No se mando";
};
