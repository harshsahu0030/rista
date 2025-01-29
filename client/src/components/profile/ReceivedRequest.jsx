import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import IconButton from "../buttons/IconButton";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  confirmRequestUserApi,
  rejectRequestUserApi,
} from "../../app/api/userApi";
import propTypes from "prop-types";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const ReceivedRequest = ({ data, refetch }) => {
  // quires;
  const { mutate: cancelMutate, isPending: cancelLoading } = useMutation({
    mutationFn: confirmRequestUserApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      refetch();
    },
  });

  const { mutate: rejectMutate, isPending: rejectLoading } = useMutation({
    mutationFn: rejectRequestUserApi,

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
    cancelMutate(data);
  };
  const rejectRequestUser = () => {
    rejectMutate(data);
  };

  //useEffect
  return (
    <>
      <IconButton
        name="Confirm"
        icon={PersonAddAltIcon}
        type="dark"
        isPending={cancelLoading && rejectLoading}
        onClick={cancelRequestUser}
      />
      <IconButton
        name="Reject"
        icon={PersonRemoveIcon}
        type="dark"
        isPending={cancelLoading && rejectLoading}
        onClick={rejectRequestUser}
      />
    </>
  );
};

ReceivedRequest.propTypes = {
  data: propTypes.string,
  refetch: propTypes.func,
};

export default ReceivedRequest;
