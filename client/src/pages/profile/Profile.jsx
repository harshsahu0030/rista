import { useContext } from "react";
import BackBox from "../../components/boxes/BackBox";
import ImageBox from "../../components/boxes/ImageBox";
import ProfileInfo from "../../components/profile/ProfileInfo";
import { sideBarLinks } from "../../data/Links";
import AuthContext from "../../context/AuthUser";
import AccountBox from "../../components/boxes/AccountBox";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserApi } from "../../app/api/userApi";
import { useEffect } from "react";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  let [searchParams, setSearchParams] = useSearchParams();

  //query
  const { data, isFetching } = useQuery({
    queryKey: ["get-user-details"],
    queryFn: () => getUserApi(searchParams.get("profile_id")),
  });

  // useEffect
  // useEffect(() => {
  //   if (!searchParams.get("profile_id")) {
  //     setSearchParams(`public_id=${currentUser._id}`);
  //   }
  // }, [searchParams, currentUser._id, setSearchParams]);

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
          <BackBox name={data?.data?.username} url={"/search"} />
          <ProfileInfo data={data?.data} />
        </div>
      </div>

      {/* right  */}
      <div className="h-[91vh] hidden xl:block w-[30%] sticky top-[9vh] py-2">
        <div className="h-full w-full flex flex-col items-center justify-center gap-5 rounded-lg overflow-y-scroll p-5 bg-cd custom-scrollbar"></div>
      </div>
    </div>
  );
};

export default Profile;
