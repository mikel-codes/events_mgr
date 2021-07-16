import React from "react";

export const ValidationErrors = ({ errors }) => {
  return errors
    ? errors.map((e, i) => (
        <h6 style={{ color: "indianred" }} key={i}>
          {e}
        </h6>
      ))
    : null;
};
