import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import CloseIcon from "@mui/icons-material/Close";
import CheckSvg from "../../../../images/svg/CheckSvg";
import style from "../../ShortStyle.module.css";
import "swiper/css/pagination";
import "swiper/css";
import { useDispatch } from "react-redux";
import { genreSelected, searchBooleanFilter } from "../func/filters";
import { getPost } from "../../../../redux/features/post/postGetSlice";
const ModalGenres = ({
  setOpen,
  genres,
  filters,
  setFilters,
  setLoaded,
  setSearchBoolean,
  handleChangeGenres,
}) => {
  const dispatch = useDispatch();

  const handleSort = (name) => {
    setFilters({ ...filters, order: name });
    dispatch(getPost(filters, setLoaded));
    if (searchBooleanFilter(filters)) {
      setSearchBoolean(false);
    } else {
      setSearchBoolean(true);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <Box className={style.containerAllBackground}>
      <Box onClick={() => handleClose()} className={style.background} />
      <Box className={style.boxModalContainer}>
        <Box textAlign={"end"}>
          <CloseIcon onClick={() => handleClose()} />
        </Box>
        <Box>
          <Typography id="genres" variant="h4" component="h4">
            Genres
          </Typography>
          <Box className={style.filterGenresContainer}>
            <Swiper
              slidesPerView={2}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                690: {
                  slidesPerView: 3,
                },
                700: {
                  slidesPerView: 4,
                },
              }}
              modules={[FreeMode]}
              className={`mySwiper ${style.swiper}`}
            >
              {genres?.map((genre, i) => (
                <SwiperSlide className={style.swiperSlice} key={i}>
                  <Button
                    className={style.genreButton}
                    color={"customOne"}
                    variant={"contained"}
                    sx={{
                      backgroundColor: genreSelected(
                        filters?.genres,
                        genre?.name
                      ),
                    }}
                    onClick={(e) => handleChangeGenres(e.target.name)}
                    name={genre?.name}
                  >
                    {genre?.name}
                  </Button>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
        <Box>
          <Typography variant="h5" component="h5">
            Sort By
          </Typography>
          <Box className={style.containerSort}>
            <Typography
              onClick={() => handleSort("relevance")}
              name="relevance"
              className={style.sortStyleText}
              variant="h6"
              component="h6"
            >
              Relevance
            </Typography>
            {filters?.order === "relevance" && (
              <CheckSvg width="16px" height="16px" />
            )}
          </Box>
          <Box className={style.containerSort}>
            <Typography
              onClick={() => handleSort("oldest")}
              className={style.sortStyleText}
              variant="h6"
              component="h6"
            >
              Oldest
            </Typography>
            {filters?.order === "oldest" && (
              <CheckSvg width="16px" height="16px" />
            )}
          </Box>

          <Box className={style.containerSort}>
            <Typography
              onClick={() => handleSort("recent")}
              className={style.sortStyleText}
              variant="h6"
              component="h6"
            >
              Most Recent
            </Typography>
            {filters?.order === "recent" && (
              <CheckSvg width="16px" height="16px" />
            )}
          </Box>
          <Box className={style.containerSort}>
            <Typography
              onClick={() => handleSort("popular")}
              name="popular"
              className={style.sortStyleText}
              variant="h6"
              component="h6"
            >
              Popular
            </Typography>
            {filters?.order === "popular" && (
              <CheckSvg width="16px" height="16px" />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalGenres;
