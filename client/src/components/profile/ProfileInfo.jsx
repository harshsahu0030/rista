import User from "../../assets/user.jpg";
import CoverImg from "../../assets/cover.webp";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import IconButton from "../buttons/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthUser";
import { useContext } from "react";

const ProfileInfo = () => {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div className=" h-fit w-full flex flex-col bg-ce rounded-lg pb-5 gap-4">
      {/* Images */}
      <div className="relative h-[40vh] lg:h-[30vh] xl:h-[50vh] w-full">
        <img
          src={
            currentUser?.coverImage?.url
              ? currentUser?.coverImage?.url
              : CoverImg
          }
          alt="background-image"
          className="object-cover h-[80%] rounded-lg w-full"
        />

        <div className="absolute h-36 w-36 object-cover md:h-60 md:w-60 lg:h-48 lg:w-48 xl:h-40 xl:w-40 rounded-full bottom-0 left-5 md:left-10 overflow-hidden">
          <img
            src={currentUser && currentUser.avatar?.url ? currentUser.avatar?.url : User}
            alt="user-image"
            className="h-full w-full p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden rounded-full"
          />
        </div>
      </div>

      {/* details  */}
      <div className="flex flex-col px-4 text-ca">
        <h2 className="font-bold text-xl md:text-2xl">{currentUser?.name}</h2>
        <p className="w-[90%] md:w-[70%] text-sm md:text-base font-medium">
          {currentUser?.bio}
        </p>
      </div>

      {/* <div className="flex px-4 gap-4 flex-wrap mt-4">
        <IconButton name="Add" icon={PersonAddAltIcon} type="dark" />
        <IconButton name="Message" icon={ForumOutlinedIcon} type="light" />
        <IconButton name="" icon={MoreHorizIcon} type="dark" />
      </div> */}

      <div className="flex px-4 gap-4 flex-wrap mt-4">
        <IconButton name="Add Post" icon={AddIcon} type="dark" />
        <IconButton
          name="Edit Profile"
          icon={EditIcon}
          type="light"
          onClick={() => navigate("/profile/update")}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
