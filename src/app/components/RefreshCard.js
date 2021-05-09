import React from "react";
import { Redirect } from "react-router-dom";

const RefreshCard = (props) => {
  const { id } = props.location.state;
  return <Redirect to={`cards/${id}`} />;
};

export default RefreshCard;
