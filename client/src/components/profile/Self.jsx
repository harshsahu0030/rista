import IconButton from "../buttons/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Self = () => {
  const navigate = useNavigate();

  return (
    <>
      <IconButton name="Add Post" icon={AddIcon} type="dark" />

      <IconButton
        name="Edit Profile"
        icon={EditIcon}
        type="light"
        onClick={() => navigate("/profile/update")}
      />
    </>
  );
};

export default Self;
