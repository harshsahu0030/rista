import IconButton from "../buttons/IconButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const ReceivedRequest = () => {
  return (
    <>
      <IconButton name="Accept request" icon={PersonAddAltIcon} type="dark" />
      <IconButton name="Message" icon={ForumOutlinedIcon} type="light" />
      <IconButton name="" icon={MoreHorizIcon} type="dark" />
    </>
  );
};

export default ReceivedRequest;
