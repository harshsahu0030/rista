import { useRef, useState } from "react";
import User from "../../assets/user.jpg";
import IconButton from "../buttons/IconButton";
import HoverImageUpdate from "../hover/HoverImageUpdate";
import AuthInput from "../inputs/AuthInput";
import TextArea from "../inputs/TextArea";
import AddGroupMember from "./AddGroupMember";

const CreateGroupInfo = () => {
  //ref
  const backgroundRef = useRef();
  const avatarRef = useRef();

  //states
  const [createGroupForm, setCreateGroupForm] = useState({
    name: "",
    bio: "",
    avatar: "",
    backgroundImage: "",
  });
  const [users, setUsers] = useState([]);

  //funtions
  const handleChange = (e) => {
    setCreateGroupForm({ ...createGroupForm, [e.target.name]: e.target.value });
  };

  const uploadAvatarHandler = () => {
    const uploadedFile = avatarRef.current.files[0];
    const cachedUrl = URL.createObjectURL(uploadedFile);
    setCreateGroupForm({ ...createGroupForm, avatar: cachedUrl });
  };

  const uploadBackgroundImgHandler = () => {
    const uploadedFile = backgroundRef.current.files[0];
    const cachedUrl = URL.createObjectURL(uploadedFile);
    setCreateGroupForm({ ...createGroupForm, backgroundImage: cachedUrl });
  };

  return (
    <form className=" h-fit w-full flex flex-col bg-ce rounded-lg pb-5 gap-4">
      {/* Images */}
      <div className="relative h-[40vh] lg:h-[30vh] xl:h-[50vh] w-full">
        <div className="h-[80%] w-full">
          <button
            type="button"
            className="relative h-full rounded-lg w-full group/btn transition-all"
            onClick={() => {
              backgroundRef.current.click();
            }}
          >
            <HoverImageUpdate />

            <img
              src="https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="background-image"
              className="object-cover h-full w-full overflow-hidden"
            />
          </button>

          <input
            ref={backgroundRef}
            type="file"
            hidden
            value={createGroupForm.backgroundImage}
            onChange={uploadBackgroundImgHandler}
          />
        </div>

        <div className="absolute h-36 w-36 md:h-60 md:w-60 lg:h-48 lg:w-48 xl:h-40 xl:w-40 rounded-full bottom-0 left-5 md:left-10  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
          <button
            type="button"
            className="relative h-full rounded-lg w-full group/btn p-2"
            onClick={() => {
              avatarRef.current.click();
            }}
          >
            <HoverImageUpdate />

            <img
              src={User}
              alt="user-image"
              className="object-cover rounded-full"
            />
          </button>

          <input
            ref={avatarRef}
            type="file"
            hidden
            value={createGroupForm.avatar}
            onChange={uploadAvatarHandler}
          />
        </div>
      </div>

      {/* details  */}
      <div className="flex flex-col px-4 text-ca gap-4">
        <AuthInput
          id="create-group-name"
          label="Name"
          type="text"
          name="name"
          placeholder="Name"
          value={createGroupForm.name}
          onChange={handleChange}
          // error={errors.email}
        />

        <TextArea
          id="create-group-bio"
          label="Bio"
          type="text"
          name="bio"
          placeholder="Bio"
          value={createGroupForm.bio}
          onChange={handleChange}
          // error={errors.email}
        />

        <div className="w-full">
          <AddGroupMember users={users} setUsers={setUsers} />
        </div>
      </div>

      <div className="flex px-4 gap-4 flex-wrap mt-4">
        <IconButton name="Create group" type="dark" />
      </div>
    </form>
  );
};

export default CreateGroupInfo;
