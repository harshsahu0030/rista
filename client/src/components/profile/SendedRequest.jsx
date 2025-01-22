import IconButton from "../buttons/IconButton";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const SendedRequest = () => {
  return (
    <>
      <IconButton name="Cancel request" icon={PersonRemoveIcon} type="dark" />
      <IconButton name="Message" icon={ForumOutlinedIcon} type="light" />
      <IconButton name="" icon={MoreHorizIcon} type="dark" />
    </>
  );
};

export default SendedRequest;
