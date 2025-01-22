import IconButton from "../buttons/IconButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

const NoRelation = () => {
  return (
    <>
      <IconButton name="Add" icon={PersonAddAltIcon} type="dark" />
      <IconButton name="Message" icon={ForumOutlinedIcon} type="light" />
      <IconButton name="" icon={MoreHorizIcon} type="dark" />
    </>
  );
};

export default NoRelation;
