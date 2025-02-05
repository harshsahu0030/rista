import User from "../../assets/user.jpg";
import CoverImg from "../../assets/cover.webp";
import propTypes from "prop-types";
import NoRelation from "./NoRelation";
import Friends from "./Friends";
import SendedRequest from "./SendedRequest";
import ReceivedRequest from "./ReceivedRequest";
import Self from "./Self";
import { useNavigate } from "react-router-dom";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import IconButton from "../buttons/IconButton";

const ProfileInfo = ({ data, refetch, userRelation }) => {
  const navigate = useNavigate();

  return (
    <div className=" h-fit w-full flex flex-col bg-ce rounded-lg pb-5 gap-4">
      {/* Images */}
      <div className="relative h-[40vh] lg:h-[30vh] xl:h-[50vh] w-full">
        <img
          src={
            data?.user?.coverImage?.url ? data?.user?.coverImage?.url : CoverImg
          }
          alt="background-image"
          className="object-cover h-[80%] rounded-lg w-full"
          height={50}
          width={50}
        />

        <div className="absolute h-36 w-36 object-cover md:h-60 md:w-60 lg:h-48 lg:w-48 xl:h-40 xl:w-40 rounded-full bottom-0 left-5 md:left-10 overflow-hidden">
          <img
            src={
              data && data?.user?.avatar?.url ? data?.user?.avatar?.url : User
            }
            alt="user-image"
            className="h-full w-full p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden rounded-full"
            height={50}
            width={50}
          />
        </div>
      </div>
      {/* details  */}
      <div className="flex flex-col px-4 text-ca">
        <h2 className="font-bold text-xl md:text-2xl">{data?.user?.name}</h2>
        <p className="w-[90%] md:w-[70%] text-sm md:text-base font-medium">
          {data?.user?.bio}
        </p>
      </div>

      <hr className="border border-cd" />

      <div className="flex px-4 gap-4 flex-wrap mt-4">
        {userRelation?.status === "self" && (
          <Self data={data?.user?._id} refetch={refetch} />
        )}
        {userRelation?.status === "noRelation" && (
          <NoRelation data={data?.user?._id} refetch={refetch} />
        )}
        {userRelation?.status === "friends" && (
          <Friends data={data?.user?._id} refetch={refetch} />
        )}
        {userRelation?.status === "sendedRequest" && (
          <SendedRequest data={data?.user?._id} refetch={refetch} />
        )}
        {userRelation?.status === "receivedRequest" && (
          <ReceivedRequest data={data?.user?._id} refetch={refetch} />
        )}

        {userRelation?.status === "self" ? (
          ""
        ) : (
          <IconButton
            name=""
            icon={ForumOutlinedIcon}
            type="light"
            onClick={() => navigate(`/messenger/${data?.user?._id}`)}
          />
        )}
      </div>
    </div>
  );
};

ProfileInfo.propTypes = {
  data: propTypes.object,
  userRelation: propTypes.object,
  refetch: propTypes.func,
};

export default ProfileInfo;
