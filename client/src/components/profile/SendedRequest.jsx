import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import IconButton from "../buttons/IconButton";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cancelRequestUserApi } from "../../app/api/userApi";
import propTypes from "prop-types";

const SendedRequest = ({ data, refetch }) => {
  // quires;
  const { mutate, isPending } = useMutation({
    mutationFn: cancelRequestUserApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      refetch();
    },
  });

  //function
  const cancelRequestUser = () => {
    mutate(data);
  };

  //useEffect

  return (
    <>
      <IconButton
        name="Cancel request"
        icon={PersonRemoveIcon}
        type="dark"
        isPending={isPending}
        onClick={cancelRequestUser}
      />
    </>
  );
};

SendedRequest.propTypes = {
  data: propTypes.string,
  refetch: propTypes.func,
};

export default SendedRequest;
