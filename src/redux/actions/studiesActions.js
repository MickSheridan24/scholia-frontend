function fetchStudies() {
  //currently fetching all
  return async dispatch => {
    const resp = await fetch("http://localhost:3000/api/v1/studies");
    const studies = await resp.json();
    if (studies.length > 0) {
      dispatch({ type: "SET_STUDIES", studies: studies });
    }
  };
}

export { fetchStudies };
