import React from "react";
import PropTypes from "prop-types";

export default function Toggle ({
  isCheck = false,
  onChange = () => {}
}) {
    return (
        <>
            <input id="toggle-all"
                   className="toggle-all"
                   type="checkbox"
                   checked={isCheck}
                   onChange={onChange} />
            <label htmlFor="toggle-all">Mark all as complete</label>
        </>
    )
}

Toggle.propTypes = {
    isCheck: PropTypes.bool.isRequired,
    onChange: PropTypes.func
}