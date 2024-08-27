import React from "react";
import NavigationClient from "./NavigationClient";
import { getCurrentUser } from "@/lib/actions/user-actions";
import { getUserNotification } from "@/lib/actions/notification-actions";

const Navigation = async () => {
  const currentUser = await getCurrentUser();
  const notificationCount  = await getUserNotification();

  return <NavigationClient notificationCount={notificationCount } currentUser={currentUser}/>;
};

export default Navigation;
