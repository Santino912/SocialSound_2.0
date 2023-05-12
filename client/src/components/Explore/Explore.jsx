import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { getGenres } from "../../redux/features/genres/genreGetSlice";
import { getPost } from "../../redux/features/post/postGetSlice";
import { booleanFilter, searchBooleanFilter } from "./utils/func/filters";
import InputComponent from "./InputComponent";
import Loading from "../loading/Loading";
import FindedComponent from "./FindedComponent";
import Post from "../post/Post";
import styles from "./Explore.module.css";
import ModalGenres from "./utils/shortComponents/ModalGenres";

const Explore = () => {
  const dispatch = useDispatch();

  const [searchBoolean, setSearchBoolean] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showModalGenres, setShowModalGenres] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    type: "",
    genres: [],
    order: "relevance",
  });
  const genres = useSelector((state) => state.genres.genreList);
  const users = useSelector((state) => state.users.usersList);
  const posts = useSelector((state) => state.posts.postsExplore);

  useEffect(() => {
    setLoaded(true);
    dispatch(getGenres());
    dispatch(getPost(filters, setLoaded));
  }, [dispatch]);

  const handleChangeFetch = (e) => {
    e.preventDefault();
    setLoaded(true);
    dispatch(getPost(filters, setLoaded));
    if (searchBooleanFilter(filters)) {
      setSearchBoolean(false);
    } else {
      setSearchBoolean(true);
    }
  };

  const handleChangeGenres = (name) => {
    let newGenres;
    if (filters.genres?.some((genre) => genre === name)) {
      newGenres = filters.genres?.filter((genre) => genre !== name);
    } else {
      newGenres = [...filters.genres, name];
    }
    setFilters({ ...filters, genres: newGenres });
    dispatch(getPost({ ...filters, genres: newGenres }, setLoaded));
    if (searchBooleanFilter(filters)) {
      setSearchBoolean(false);
    } else {
      setSearchBoolean(true);
    }
  };

  const handleChangeType = (name) => {
    setLoaded(true);
    const newFilter = { ...filters, type: name };
    setFilters(newFilter);
    dispatch(getPost(newFilter, setLoaded));
  };

  return (
    <Box>
      <Box className={styles.fondo}></Box>
      <Box className={styles.filter}></Box>
      <Box className={styles.allContainer}>
        <Box className={styles.sideBarSpace} />
        <Box className={styles.container}>
          <Box width={"100%"} className={styles.title}>
            <Typography variant="h2" component={"h1"} fontWeight={"500"}>
              Explore
            </Typography>
          </Box>
          <Box className={styles.allFiltersContainer}>
            <Box className={styles.filtersInput}>
              <InputComponent
                filters={filters}
                setFilters={setFilters}
                handleChangeFetch={handleChangeFetch}
              />
            </Box>
            <Box className={styles.buttonFilter}>
              <Button
                onClick={() => setShowModalGenres(!showModalGenres)}
                variant="contained"
                color="customOne"
              >
                Filters
              </Button>
            </Box>
            <Box textAlign={"center"}>
              <Button
                color="customOne"
                onClick={(e) => handleChangeType(e.target.name)}
                name={"all"}
              >
                All
              </Button>
              <Button
                color="customOne"
                onClick={(e) => handleChangeType(e.target.name)}
                name={"video"}
              >
                Video
              </Button>
              <Button
                color="customOne"
                onClick={(e) => handleChangeType(e.target.name)}
                name={"audio"}
              >
                Audio
              </Button>
            </Box>
          </Box>
          <Box className={styles.containerUsersPosts}>
            {loaded ? (
              <Loading width={"10vw"} />
            ) : (
              <FindedComponent
                posts={posts}
                users={users}
                searchBoolean={searchBoolean}
              />
            )}
            {booleanFilter(searchBoolean, posts) &&
              posts?.map((post, i) => (
                <Post key={i} post={post} comments={false} />
              ))}
            {!loaded && posts?.length === 0 && users?.length === 0 && (
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                height={"50vh"}
              >
                <Typography
                  textAlign={"center"}
                  component={"h4"}
                  variant={"h4"}
                >
                  There are no songs or users with these characteristics
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {showModalGenres && (
        <ModalGenres
          setOpen={setShowModalGenres}
          handleChangeFetch={handleChangeFetch}
          genres={genres}
          filters={filters}
          setFilters={setFilters}
          setSearchBoolean={setSearchBoolean}
          handleChangeGenres={handleChangeGenres}
          setLoaded={setLoaded}
        />
      )}
    </Box>
  );
};

export default Explore;
