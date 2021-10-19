import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";

export const SidebarData = [
  {
    title: "Home",
    path: "/restaurantSearch",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },

  {
    title: "Profile Info",
    path: "/profileInfo",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Orders",
    path: "/orders",
    icon: <AiIcons.AiOutlineShop />,
    cName: "nav-text",
  },
  {
    title: "Favorites",
    path: "/favorites",
    icon: <FaIcons.FaHeart />,
    cName: "nav-text",
  },
  {
    title: "Sign Out",
    path: "/customerLogin",
    icon: <FaPowerOff />,
    cName: "nav-text",
  },
];
