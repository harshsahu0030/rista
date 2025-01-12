import { useNavigate } from "react-router-dom";
import ImageBox from "../../components/boxes/ImageBox";
import IconButton from "../../components/buttons/IconButton";
import NavigationLinks from "../../components/NavigationLinks";
import { profileDataLink, sideBarLinks } from "../../data/Links";
import SeachInput from "../../components/inputs/SeachInput";
import { useState } from "react";
import ResentSearch from "../../components/boxes/ResentSearch";
import AccountBox from "../../components/boxes/AccountBox";
import SearchUserBox from "../../components/boxes/SearchUserBox";

const Friends = () => {
  const navigate = useNavigate();

  //states
  const [searchQuery, setSearchQuery] = useState("");

  //functions
  const onChange = (e) => {
    setSearchQuery(e.target.value);
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
        <div className="w-full flex flex-col bg-cd lg:rounded-lg p-2 xl:p-5">
          <NavigationLinks />
        </div>

        <div className="w-full flex flex-col bg-cd lg:rounded-lg p-2 xl:p-5 gap-2">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold text-ce flex items-center gap-2">
              Friends
            </h2>

            <IconButton
              name="requests"
              type=""
              onClick={() => navigate("/friends/request")}
            />
          </div>

          <hr className="border-b border-ce"></hr>

          <div className="h-[8vh] md:h-[5vh] lg:h-[4vh] xl:h-[8vh]  bg-cb/70 rounded-full flex flex-col">
            <SeachInput
              placeholder="search rista"
              value={searchQuery}
              onChange={onChange}
            />
          </div>

          <ResentSearch />

          <SearchUserBox data={profileDataLink} />
          <SearchUserBox data={profileDataLink} />
          <SearchUserBox data={profileDataLink} />
        </div>
      </div>

      {/* right  */}
      <div className="h-[91vh] hidden xl:block w-[30%] sticky top-[9vh] py-2">
        <div className="h-full w-full flex flex-col items-center justify-center gap-5 rounded-lg overflow-y-scroll p-5 bg-cd custom-scrollbar"></div>
      </div>
    </div>
  );
};

export default Friends;
