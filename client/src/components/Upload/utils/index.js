import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";

export const uploadContent = async (file, setLoading, loading) => {
  const fileRef = ref(storage, `content/${file.name + Math.random()}`);
  return uploadBytes(fileRef, file)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .then((url) => {
      setLoading({ ...loading, content: false });
      return url;
    });
};

export const uploadCover = async (file, setLoading, loading) => {
  const fileRef = ref(storage, `cover/${file.name + Math.random()}`);
  return uploadBytes(fileRef, file)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .then((url) => {
      setLoading({ ...loading, cover: false });
      return url;
    })
    .catch((err) => console.log(err));
};

export const handleErrorsBoolean = (postData) => {
  if (
    !postData?.title ||
    !postData?.content ||
    !postData?.type ||
    !postData?.content ||
    postData?.genres?.length <= 0
  ) {
    return true;
  }
  return false;
};

export const handleErrors = (postData) => {
  let aux = {
    title: "",
    description: "",
    content: "",
    type: "",
    genres: "",
  };

  if (!postData?.title) aux.title = "Agregate title";
  if (!postData?.content) aux.content = "Please add one song";
  if (postData?.genres?.length <= 0) aux.genres = "Please add a gender";
  return aux;
};
