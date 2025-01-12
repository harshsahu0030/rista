import propTypes from "prop-types";
import User from "../../assets/user.jpg";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const AddGroupUserBox = ({ data, users, setUsers }) => {
  const handleAddUserButton = (user) => {
    let index = users.findIndex((temp) => temp._id === user._id);
    if (index === -1) {
      setUsers([...users, user]);
    }
  };
  return (
    <div className="relative w-full h-[7vh] md:h-[6vh] lg:h-[5vh] xl:h-[8vh] flex rounded-lg p-2 gap-4 hover:bg-cc/80 transition-all cursor-pointer bg-cb ">
      {/* left  */}
      <div className="flex items-center justify-center h-full w-[15%]">
        <img
          src={data?.image ? data.image : User}
          alt="image"
          className="h-10 w-10 rounded-full object-cover"
        />
      </div>

      {/* right */}
      <div className="h-full w-[80%] flex items-center justify-between text-white capitalize">
        <div className="flex flex-col">
          <span className="font-bold">{data?.userName}</span>
          <span className="text-xs">{data?.name}</span>
        </div>

        {users?.find((item) => item._id === data._id) ? (
          <RadioButtonCheckedIcon className="text-ce" />
        ) : (
          <RadioButtonUncheckedIcon
            className="text-ce"
            onClick={() =>
              handleAddUserButton({
                _id: data?._id,
                userName: data?.userName,
                avatar: data?.image ? data?.image : {},
              })
            }
          />
        )}
      </div>
    </div>
  );
};

AddGroupUserBox.propTypes = {
  data: propTypes.object,
  users: propTypes.array,
  setUsers: propTypes.func,
};

export default AddGroupUserBox;
