import { useQuery } from "@tanstack/react-query";
import { getUsersFriendsRequestApi } from "../../app/api/userApi";
import AccountBox from "../../components/boxes/AccountBox";
import BackBox from "../../components/boxes/BackBox";
import ImageBox from "../../components/boxes/ImageBox";
import RequestBox from "../../components/boxes/RequestBox";
import { sideBarLinks } from "../../data/Links";

const RequestFriend = () => {
  // quries
  const { data, isLoading } = useQuery({
    queryKey: ["get-users-friends"],
    queryFn: () => getUsersFriendsRequestApi(),
  });

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
        <div className="w-full flex flex-col bg-cd lg:rounded-lg p-2 xl:p-5">
          <BackBox name="friends request" />
        </div>

        <div className="w-full flex flex-col bg-cd lg:rounded-lg p-2 xl:p-5 gap-2">
          {isLoading
            ? "loading..."
            : data && data?.data?.length > 0
            ? data?.data?.map((item) => (
                <RequestBox key={item._id} data={item} />
              ))
            : "No requests found"}
        </div>
      </div>

      {/* right  */}
      <div className="h-[91vh] hidden xl:block w-[30%] sticky top-[9vh] py-2">
        <div className="h-full w-full flex flex-col items-center justify-center gap-5 rounded-lg overflow-y-scroll p-5 bg-cd custom-scrollbar"></div>
      </div>
    </div>
  );
};

export default RequestFriend;
