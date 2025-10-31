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
  FaCross,
} from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi2";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { TbJewishStar } from "react-icons/tb";

export const dashboardLinks = {
  // For User Only
  user: [
    { label: "Overview", href: "/", icon: <HiOutlineHome /> },
    { label: "Profile", href: "/profile", icon: <FaRegUser /> },

    { label: "User Reminder", href: "/user-reminder", icon: <FaBell /> },
    { label: "My Tickets", href: "/my-tickets", icon: <FaTicketAlt /> },
    { label: "Movies Payments", href: "/movies-payments", icon: <FaFilm /> },
    {
      label: "Events Payments",
      href: "/events-payments",
      icon: <FaMoneyBillWave />,
    },
    { label: "My Blogs", href: "/my-blogs", icon: <FaMoneyBillWave /> },
    { label: "My Wishlist", href: "/wishlist", icon: <TbJewishStar /> },
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
      label: "Ticket Cancellation",
      href: "/ticket-cancellation",
      icon: <IoMdCloseCircleOutline />,
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
    {
      label: "Manage Movies",
      href: "/movie-managements",
      icon: <FaClipboardList />,
    },

    { label: "Reminder", href: "/reminder", icon: <FaBell /> },
    {
      label: "Payment History",
      href: "/payment-history",
      icon: <FaMoneyCheckAlt />,
    },
  ],
  // For Admin Only
  admin: [
    { label: "Overview", href: "/", icon: <HiOutlineHome /> },
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
