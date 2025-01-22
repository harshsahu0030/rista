import IconButton from "../buttons/IconButton";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";


const Friends = () => {
  return (
    <>
      <IconButton name="Message" icon={ForumOutlinedIcon} type="light" />
      <IconButton name="" icon={MoreHorizIcon} type="dark" />

    </>
  );
};

export default Friends;
