import { useRef, useState } from "react";
import BackBox from "../../components/boxes/BackBox";
import ImageBox from "../../components/boxes/ImageBox";
import HoverImageUpdate from "../../components/hover/HoverImageUpdate";
import { sideBarLinks } from "../../data/Links";
import TextArea from "../../components/inputs/TextArea";
import IconButton from "../../components/buttons/IconButton";
import AccountBox from "../../components/boxes/AccountBox";

const AddPost = () => {
  //ref
  const postImageRef = useRef();

  //states
  const [createPostForm, setCreatePostForm] = useState({
    image: "",
    caption: "",
  });

  //function
  const handleChange = (e) => {
    setCreatePostForm({ ...createPostForm, [e.target.name]: e.target.value });
  };

  const newPostImageHandler = () => {
    const uploadedFile = postImageRef.current.files[0];
    const cachedUrl = URL.createObjectURL(uploadedFile);
    setCreatePostForm({ ...createPostForm, backgroundImage: cachedUrl });
  };

  return (
    <div className="flex min-h-[91vh] w-full justify-between gap-2 xl:gap-20">
      {/* left  */}
      <div className="h-[91vh] hidden lg:block w-[30%] sticky top-[9vh] py-2">
        <div className="h-full w-full flex flex-col gap-5 rounded-lg overflow-y-scroll p-5 bg-cd custom-scrollbar">
          <div className="flex flex-col gap-2">
            <AccountBox />

            {sideBarLinks
              ? sideBarLinks.map((item) => (
                  <ImageBox key={item.name} data={item} />
                ))
              : ""}
          </div>
        </div>
      </div>

      {/* center  */}
      <div className="flex flex-col w-[100%] lg:w-[70%] xl:w-[50%] lg:p-2 gap-2">
        <div className="w-full flex flex-col bg-cd lg:rounded-lg p-6 xl:p-5 gap-2">
          <BackBox name="New Post" />
        </div>

        {/* post image  */}
        <div className="w-full flex flex-col bg-cd lg:rounded-lg p-6 xl:p-5 gap-4">
          <div className="relative h-[50vh] lg:h-[30vh] xl:h-[60vh] w-full">
            <button
              type="button"
              className="relative h-full rounded-lg w-full group/btn transition-all"
              onClick={() => {
                postImageRef.current.click();
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
              ref={postImageRef}
              type="file"
              hidden
              value={createPostForm.image}
              onChange={newPostImageHandler}
            />
          </div>

          {/* caption */}
          <div className="h-fit w-full bg-ce p-4 rounded-lg">
            <TextArea
              id="create-post-caption"
              label="Caption"
              type="text"
              name="caption"
              placeholder="Type caption here..."
              value={createPostForm.caption}
              onChange={handleChange}
              // error={errors.email}
            />
          </div>

          <div className="flex mt-4 flex-wrap ">
            <IconButton name="Submit" type="dark" />
          </div>
        </div>
      </div>

      {/* right  */}
      <div className="h-[91vh] hidden xl:block w-[30%] sticky top-[9vh] py-2">
        <div className="h-full w-full flex flex-col items-center justify-center gap-5 rounded-lg overflow-y-scroll p-5 bg-cd custom-scrollbar"></div>
      </div>
    </div>
  );
};

export default AddPost;
