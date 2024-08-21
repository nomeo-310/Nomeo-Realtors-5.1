import React from "react";
import NavigationClient from "./NavigationClient";

const Navigation = () => {
  const notification = true;
  const currentUser = false;

  return <NavigationClient notification={notification} currentUser={currentUser}/>;
};

export default Navigation;
