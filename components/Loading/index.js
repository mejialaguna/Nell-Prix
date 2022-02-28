import React from "react";
import { SemipolarLoading } from "react-loadingg";

const display = {
  flex: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
  },
  loading: {
    height: "0px",
    margin: "70px auto",
  },
};

const Loading = () => {
  return (
    <div style={display.flex}>
      <SemipolarLoading style={display.loading} />

      <h3>Loading</h3>
    </div>
  );
};
export default Loading;
