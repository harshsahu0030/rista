import { useParams } from "react-router-dom";
import AccountBox from "../../components/boxes/AccountBox";
import ImageBox from "../../components/boxes/ImageBox";
import NavigationLinks from "../../components/NavigationLinks";
import { sideBarLinks } from "../../data/Links";
import { getUserApi } from "../../app/api/userApi";
import { useQuery } from "@tanstack/react-query";
import BackBox from "../../components/boxes/BackBox";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MessageInput from "../../components/inputs/MessageInput";
import MessageBox from "../../components/boxes/MessageBox";

const SingleChat = () => {
  const { id } = useParams();

  //states
  const [message, setMessage] = useState("");

  //queries
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["get-user-details", id],
    queryFn: () => getUserApi(id),
    retry: 1,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.response.data.message);
    }
  }, [isError, error]);

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
      <div className="flex flex-col w-[100%] lg:w-[70%] xl:w-[50%] lg:p-2 gap-2 h-[91vh]">
        <div className="w-full flex flex-col bg-cd lg:rounded-lg p-2 xl:p-5">
          <BackBox name={data?.data?.user?.username || "User"} />
        </div>

        <div className="w-full flex flex-col gap-4 bg-cd lg:rounded-lg p-2 xl:p-5 overflow-y-scroll custom-scrollbar h-full">
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
        </div>

        <div className="w-full flex flex-col bg-cd lg:rounded-lg p-2 xl:p-2 gap-2 h-[10vh] md:h-[6vh] xl:h-[10vh]">
          <MessageInput
            placeholder={"Enter your messgae..."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      {/* right  */}
      <div className="h-[91vh] hidden xl:block w-[30%] sticky top-[9vh] py-2">
        <div className="h-full w-full flex flex-col items-center justify-center gap-5 rounded-lg overflow-y-scroll p-5 bg-cd custom-scrollbar"></div>
      </div>
    </div>
  );
};

export default SingleChat;
