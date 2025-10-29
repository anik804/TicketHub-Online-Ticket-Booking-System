// React Icons
import {
  FaCalendarPlus,
  FaClipboardList,
  FaBell,
  FaMoneyCheckAlt,
  FaTicketAlt,
  FaRegUser,
  FaUserCog,
  FaMoneyBillWave,
  FaFilm,
  FaUsers,
  FaUserShield,
  FaCalendarAlt,
} from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi2";

// যার যার লিঙ্ক দেখে পেজ গুলা দেখে আসবেন
// সবার লিঙ্ক আছে
// বুজে শুনে সিরিয়ালও করতে পারেন

export const dashboardLinks = {
  // For User Only
  user: [
    { label: "Overview", href: "/", icon: <HiOutlineHome /> },
    { label: "Profile", href: "/profile", icon: <FaRegUser /> },
    { label: "Settings", href: "/settings", icon: <FaUserCog /> },
    { label: "User Reminder", href: "/user-reminder", icon: <FaBell /> },
    { label: "My Tickets", href: "/my-tickets", icon: <FaTicketAlt /> },
    { label: "Movies Payments", href: "/movies-payments", icon: <FaFilm /> },
    {
      label: "Events Payments",
      href: "/events-payments",
      icon: <FaMoneyBillWave />,
    },
    { label: "My Blogs", href: "/my-blogs", icon: <FaMoneyBillWave /> },
  ],
  // For Organizer Only
  organizer: [
    { label: "Overview", href: "/", icon: <HiOutlineHome /> },
    { label: "Add Event", href: "/add-event", icon: <FaCalendarPlus /> },
    { label: "Manage Events", href: "/managements", icon: <FaClipboardList /> },
    {
      label: "Organizer Reminder",
      href: "/organizer-reminder",
      icon: <FaBell />,
    },
    {
      label: "Payment History",
      href: "/payment-history",
      icon: <FaMoneyCheckAlt />,
    },
  ],
  // For Movie Admin Only
  movieadmin: [
    { label: "Overview", href: "/", icon: <HiOutlineHome /> },
    { label: "Add Movie", href: "/add-movie", icon: <FaCalendarPlus /> },
    { label: "Manage Movies", href: "/managements", icon: <FaClipboardList /> },
    { label: "Reminder", href: "/reminder", icon: <FaBell /> },
    {
      label: "Payment History",
      href: "/payment-history",
      icon: <FaMoneyCheckAlt />,
    },
  ],
  // For Admin Only
  admin: [
    { label: "Overview", href: "/adminOverview", icon: <HiOutlineHome /> },
    { label: "All Users", href: "/all-users", icon: <FaUsers /> },
    { label: "All Event", href: "/all-events", icon: <FaCalendarAlt /> },
    {
      label: "Make Organizer",
      href: "/make-organizer",
      icon: <FaUserShield />,
    },
    { label: "Events Reminder", href: "/events-reminder", icon: <FaBell /> },
  ],
};
