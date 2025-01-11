import { useContext, useRef, useState } from "react";
import User from "../../assets/user.jpg";
import CoverImg from "../../assets/cover.webp";
import HoverImageUpdate from "../hover/HoverImageUpdate";
import AuthInput from "../inputs/AuthInput";
import TextArea from "../inputs/TextArea";
import AuthContext from "../../context/AuthUser";
import { useMutation } from "@tanstack/react-query";
import { updateUserProfileApi } from "../../app/api/userApi";
import toast from "react-hot-toast";

const UpdateProfileInfo = () => {
  const { currentUser, refetch } = useContext(AuthContext);

  //ref
  const coverImageRef = useRef();
  const avatarRef = useRef();

  //states
  const [updateForm, setUpdateForm] = useState({
    username: currentUser?.username,
    name: currentUser?.name,
    bio: currentUser?.bio ? currentUser?.bio : "",
    avatar: currentUser.avatar?.url,
    coverImage: currentUser.coverImage?.url,
  });
  const [newUpdateForm, setNewUpdateForm] = useState({});

  //react quires
  const { mutate, isPending } = useMutation({
    mutationFn: updateUserProfileApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      refetch();
    },
  });

  //funtions
  const handleChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
    setNewUpdateForm({ ...newUpdateForm, [e.target.name]: e.target.value });
  };

  const uploadAvatarHandler = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setUpdateForm({ ...updateForm, avatar: reader.result });
          setNewUpdateForm({ ...newUpdateForm, avatar: reader.result });
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
          setUpdateForm({ ...updateForm, coverImage: reader.result });
          setNewUpdateForm({
            ...newUpdateForm,
            coverImage: reader.result,
          });
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(updateForm);
  };

  return (
    <form
      className=" h-fit w-full flex flex-col bg-ce rounded-lg pb-5 gap-4"
      onSubmit={handleSubmit}
    >
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
                updateForm && updateForm.coverImage
                  ? updateForm.coverImage
                  : CoverImg
              }
              alt="cover-image"
              className="object-cover h-full w-full overflow-hidden"
            />
          </button>

          <input
            ref={coverImageRef}
            type="file"
            hidden
            onChange={uploadBCoverImageHandler}
            disabled={isPending}
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
              src={updateForm && updateForm.avatar ? updateForm.avatar : User}
              alt="user-image"
              className="h-full w-full p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden rounded-full"
            />
          </button>

          <input
            ref={avatarRef}
            type="file"
            hidden
            onChange={uploadAvatarHandler}
            disabled={isPending}
          />
        </div>
      </div>
      {/* details  */}
      <div className="flex flex-col px-4 text-ca gap-2">
        <AuthInput
          id="update-username"
          label="username"
          type="text"
          name="username"
          placeholder="Username"
          value={updateForm.username}
          onChange={handleChange}
          disable={isPending}
        />
        <AuthInput
          id="update-name"
          label="Name"
          type="text"
          name="name"
          placeholder="Name"
          value={updateForm.name}
          onChange={handleChange}
          disable={isPending}
        />
        <TextArea
          id="update-bio"
          label="Bio"
          type="text"
          name="bio"
          placeholder="Bio"
          value={updateForm.bio}
          onChange={handleChange}
          disable={isPending}
        />
        <button
          className="mt-4 px-4 text-sm md:text-base w-fit h-fit py-2 rounded-md flex items-center justify-center gap-2 capitalize font-bold border border-cc transition-all duration-300 bg-cc text-ce hover:bg-cc/80"
          disabled={isPending}
        >
          {isPending ? "loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default UpdateProfileInfo;
