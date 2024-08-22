import React from "react";
import NavigationClient from "./NavigationClient";
import { getCurrentUser } from "@/lib/actions/user-actions";

const Navigation = async () => {
  const notification = false;
  const currentUser = await getCurrentUser();

  return <NavigationClient notification={notification} currentUser={currentUser}/>;
};

export default Navigation;
