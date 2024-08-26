import React from "react";
import NavigationClient from "./NavigationClient";
import { getCurrentUser } from "@/lib/actions/user-actions";
import Notifications from "@/lib/models/notifications";

const Navigation = async () => {
  const currentUser = await getCurrentUser();
  const notificationCount  = await Notifications.countDocuments({recipient: currentUser._id, seen: false});

  return <NavigationClient notificationCount={notificationCount } currentUser={currentUser}/>;
};

export default Navigation;
