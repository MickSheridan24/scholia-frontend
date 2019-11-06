import ENDPOINT from "../endpoint";
// fetches studies from backend
function fetchStudies() {
  return async dispatch => {
    const resp = await fetch(`${ENDPOINT}/studies`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
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

//Subscribes/unsubscribes from study
function toggleStudy(studyId, subscribe) {
  const options = subscribe
    ? {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ study_id: studyId })
      }
    : {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      };
  const url = subscribe
    ? `${ENDPOINT}/subscriptions`
    : `${ENDPOINT}/subscriptions/${studyId}`;
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
