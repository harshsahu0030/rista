import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AddIcon from "@mui/icons-material/Add";
import SeachInput from "../inputs/SeachInput";
import AddGroupUserBox from "../boxes/AddGroupUserBox";
import { profileDataLink } from "../../data/Links";
import { useState } from "react";
import propTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";

const AddGroupMember = ({ users, setUsers }) => {
  //states
  const [toggleBtn, setToggleBtn] = useState(false);

  //functions
  const handleToggle = () => {
    setToggleBtn((prev) => !prev);
  };

  const handleRemoveUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full h-fit p-2 rounded-lg  bg-cd">
      <div
        className={`flex flex-col gap-2 p-2 bg-ce rounded-lg ${
          toggleBtn ? "h-[60vh]" : "h-fit"
        }`}
      >
        <div
          className="flex justify-between items-center gap-2 cursor-pointer"
          onClick={handleToggle}
        >
          <span className="font-semibold flex gap-2 items-center">
            <AddIcon /> Add member
          </span>

          {toggleBtn ? (
            <ArrowDropUpIcon fontSize="large" />
          ) : (
            <ArrowDropDownIcon fontSize="large" />
          )}
        </div>

        {toggleBtn ? (
          <div className="flex flex-col gap-2 custom-scrollbar overflow-y-scroll">
            <hr className="border-b border-cc"></hr>

            <div className="h-[7vh] md:h-[5vh] lg:h-[4vh] xl:h-[7vh] min-h-[7vh] md:min-h-[5vh] lg:min-h-[4vh] xl:min-h-[7vh] w-full bg-cb rounded-lg">
              <SeachInput placeholder={"Search Member"} onChange={() => {}} />
            </div>

            <ul className="flex flex-wrap gap-1">
              {users?.map((item, i) => (
                <li
                  key={item._id}
                  className="flex items-center gap-2 p-2 bg-cb rounded-lg text-white cursor-pointer hover:bg-cb/90"
                  onClick={() => handleRemoveUser(i)}
                >
                  <span>{item.userName}</span>
                  <CloseIcon fontSize="small" />
                </li>
              ))}
            </ul>

            <hr className="border-b border-cc"></hr>

            <ul className="flex flex-col gap-2">
              <AddGroupUserBox
                data={profileDataLink}
                users={users}
                setUsers={setUsers}
              />
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

AddGroupMember.propTypes = {
  users: propTypes.array,
  setUsers: propTypes.func,
};

export default AddGroupMember;
