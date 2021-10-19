import React from "react";
import * as AiIcons from "react-icons/ai";
import { FaPowerOff } from "react-icons/fa";

export const SidebarData = [
  {
    title: "Home",
    path: "/restaurantDetails",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Orders",
    path: "/restaurantOrders",
    icon: <AiIcons.AiOutlineShop />,
    cName: "nav-text",
  },
  {
    title: "Sign Out",
    path: "/restaurantLogin",
    icon: <FaPowerOff />,
    cName: "nav-text",
  },
];
