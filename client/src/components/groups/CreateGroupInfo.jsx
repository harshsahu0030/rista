import { useRef, useState } from "react";
import User from "../../assets/user.jpg";
import CoverImg from "../../assets/cover.webp";
import IconButton from "../buttons/IconButton";
import HoverImageUpdate from "../hover/HoverImageUpdate";
import AuthInput from "../inputs/AuthInput";
import TextArea from "../inputs/TextArea";
import AddGroupMember from "./AddGroupMember";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createGroupApi } from "../../app/api/chatApi";

const CreateGroupInfo = () => {
  //ref
  const coverImageRef = useRef();
  const avatarRef = useRef();

  //states
  const [createGroupForm, setCreateGroupForm] = useState({
    name: "",
    bio: "",
    avatar: "",
    coverImage: "",
  });
  const [users, setUsers] = useState([]);

  // quires
  const { mutate, isPending } = useMutation({
    mutationFn: createGroupApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });

  //funtions
  const handleChange = (e) => {
    setCreateGroupForm({ ...createGroupForm, [e.target.name]: e.target.value });
  };

  const uploadAvatarHandler = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setCreateGroupForm({ ...createGroupForm, avatar: reader.result });
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const uploadBCoverImageHandler = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setCreateGroupForm({ ...createGroupForm, coverImage: reader.result });
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newObj = {
      ...createGroupForm,
      members: users.map((user) => user._id),
    };

    console.log(newObj);
    mutate(newObj);
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
              coverImageRef.current.click();
            }}
          >
            <HoverImageUpdate />

            <img
              src={
                createGroupForm && createGroupForm.coverImage
                  ? createGroupForm.coverImage
                  : CoverImg
              }
              alt="cover-image"
              className="object-cover h-full w-full overflow-hidden"
              height={50}
              width={50}
            />
          </button>

          <input
            ref={coverImageRef}
            type="file"
            hidden
            onChange={uploadBCoverImageHandler}
          />
        </div>

        <div className="absolute h-36 w-36 object-cover md:h-60 md:w-60 lg:h-48 lg:w-48 xl:h-40 xl:w-40 rounded-full bottom-0 left-5 md:left-10 overflow-hidden">
          <button
            type="button"
            className="relative h-full rounded-lg w-full group/btn"
            onClick={() => {
              avatarRef.current.click();
            }}
          >
            <HoverImageUpdate />

            <img
              src={
                createGroupForm && createGroupForm.avatar
                  ? createGroupForm.avatar
                  : User
              }
              alt="user-image"
              className="h-full w-full p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden rounded-full"
              height={50}
              width={50}
            />
          </button>

          <input
            ref={avatarRef}
            type="file"
            hidden
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
        <IconButton
          name="Create group"
          type="dark"
          onClick={handleSubmit}
          isPending={isPending}
        />
      </div>
    </form>
  );
};

export default CreateGroupInfo;
