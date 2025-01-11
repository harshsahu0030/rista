//material icon
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import ForumIcon from "@mui/icons-material/Forum";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import SettingsIcon from "@mui/icons-material/Settings";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import FeedbackIcon from "@mui/icons-material/Feedback";

//local icon
import User02 from "../assets/user.jpg";
import Home from "../assets/home-button.png";
import Friends from "../assets/add-group.png";
import Chat from "../assets/chat.png";
import Groups from "../assets/users.png";
import Notification from "../assets/bell-ringing.png";
import Saved from "../assets/bookmark.png";
import Memories from "../assets/time-passing.png";

export const profileDataLink = {
  _id: "harsh0030test_id",
  name: "Harsh Sahu",
  userName: "harsh0030",
  image: User02,
  url: "/profile",
};

export const navigationLinks = [
  {
    name: "home",
    url: "/home",
    icon: HomeOutlinedIcon,
    activeIcon: HomeIcon,
  },
  {
    name: "friends",
    url: "/friends",
    icon: PeopleAltOutlinedIcon,
    activeIcon: PeopleAltIcon,
  },
  {
    name: "messenger",
    url: "/messenger",
    icon: ForumOutlinedIcon,
    activeIcon: ForumIcon,
  },
  {
    name: "groups",
    url: "/groups",
    icon: Diversity1OutlinedIcon,
    activeIcon: Diversity1Icon,
  },
  {
    name: "notification",
    url: "/notification",
    icon: NotificationsNoneIcon,
    activeIcon: NotificationsIcon,
  },
];

export const sideBarLinks = [
  {
    name: "home",
    url: "/home",
    image: Home,
  },
  {
    name: "friends",
    url: "/friends",
    image: Friends,
  },
  {
    name: "messenger",
    url: "/messenger",
    image: Chat,
  },
  {
    name: "groups",
    url: "/groups",
    image: Groups,
  },
  {
    name: "notification",
    url: "/notification",
    image: Notification,
  },
];

export const accountLinks = [
  {
    name: "Setting & privacy",
    url: "/",
    icon: SettingsIcon,
  },
  {
    name: "help & support",
    url: "/",
    icon: QuestionMarkIcon,
  },
  {
    name: "Give feedback",
    url: "/",
    icon: FeedbackIcon,
  },
];

export const bookmarksLinks = [
  {
    name: "home",
    url: "/home",
    image: Home,
  },
  {
    name: "friends",
    url: "/friends",
    image: Friends,
  },
  {
    name: "messenger",
    url: "/messenger",
    image: Chat,
  },
  {
    name: "groups",
    url: "/groups",
    image: Groups,
  },
  {
    name: "notification",
    url: "/notification",
    image: Notification,
  },
  {
    name: "saved",
    url: "/saved",
    image: Saved,
  },
  {
    name: "memories",
    url: "/memories",
    image: Memories,
  },
];
