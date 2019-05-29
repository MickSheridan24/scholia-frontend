function fetchStudies() {
  //currently fetching all
  return async dispatch => {
    const resp = await fetch("http://localhost:3000/api/v1/studies", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const studies = await resp.json();
    if (studies.length > 0) {
      const preparedStudies = studies.map(s => {
        return { ...s, visible: true };
      });
      dispatch({ type: "SET_STUDIES", studies: preparedStudies });
    }
  };
}

function toggleStudy(studyId, subscribe) {
  const options = subscribe
    ? {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ study_id: studyId }),
      }
    : {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
  const url = subscribe
    ? "http://localhost:3000/api/v1/subscriptions"
    : `http://localhost:3000/api/v1/subscriptions/${studyId}`;
  return async dispatch => {
    const resp = await fetch(url, options);

    const success = await resp.json();
    debugger;
    if (success.success) {
      dispatch({ type: "TOGGLE_STUDY", studyId: studyId, bool: subscribe });
    }
  };
}

export { fetchStudies, toggleStudy };
