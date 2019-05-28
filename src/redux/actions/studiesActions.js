function fetchStudies() {
  //currently fetching all
  return async dispatch => {
    const resp = await fetch("http://localhost:3000/api/v1/studies");
    const studies = await resp.json();
    if (studies.length > 0) {
      const preparedStudies = studies.map(s => {
        return { ...s, visible: true };
      });
      dispatch({ type: "SET_STUDIES", studies: preparedStudies });
    }
  };
}

function toggleStudy(studyId, bool) {
  return { type: "TOGGLE_STUDY", studyId: studyId, bool: bool };
}

export { fetchStudies, toggleStudy };
