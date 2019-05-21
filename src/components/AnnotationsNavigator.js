import React, { useState } from "react";

export default function AnnotationsNavigator() {
  const [hidden, setHidden] = useState(true);
  const [userChecked, setUserChecked] = useState(true);
  const [otherChecked, setOtherChecked] = useState(true);

  function form() {
    return (
      <div className="ui segment">
        <input
          type="checkbox"
          name={"checkUsers"}
          checked={userChecked}
          onChange={() => setUserChecked(!userChecked)}
        />
        <label>My Annotations</label>
        <input
          type="checkbox"
          name={"checkOthers"}
          checked={otherChecked}
          onChange={() => setOtherChecked(!otherChecked)}
        />
        <label>Other Annotations</label>
        <button onClick={() => setHidden(true)}>X</button>
      </div>
    );
  }

  return <div>{hidden ? <button onClick={() => setHidden(false)}>^</button> : form()}</div>;
}
