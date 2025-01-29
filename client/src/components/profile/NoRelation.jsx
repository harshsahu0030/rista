import IconButton from "../buttons/IconButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sendRequestUserApi } from "../../app/api/userApi";
import propTypes from "prop-types";

const NoRelation = ({ data, refetch }) => {
  // quires;
  const { mutate, isPending } = useMutation({
    mutationFn: sendRequestUserApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      refetch();
    },
  });

  //function
  const addUser = () => {
    mutate(data);
  };

  //useEffect

  return (
    <>
      <IconButton
        name="Add Friend"
        icon={PersonAddAltIcon}
        type="dark"
        isPending={isPending}
        onClick={addUser}
      />
    </>
  );
};

NoRelation.propTypes = {
  data: propTypes.string,
  refetch: propTypes.func,
};

export default NoRelation;
