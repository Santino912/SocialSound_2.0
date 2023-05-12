export function booleanFilter(search, posts) {
  if (!search && posts.length > 0) {
    return true;
  }
  return false;
}

export function booleanFilterToShort(search) {
  if (!search) return false;
  return true;
}

export function searchBooleanFilter(filters) {
  if (
    !filters?.name &&
    !filters?.type &&
    filters?.genres.length <= 0 &&
    !filters?.order
  ) {
    return true;
  }
  return false;
}

export function genreSelected(genres, genreSelected) {
  if (genres?.some((genre) => genre === genreSelected)) {
    return "#00a187";
  }
  return "#00ffd6";
}
