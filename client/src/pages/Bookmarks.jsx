import AccountBox from "../components/boxes/AccountBox";
import IconBox from "../components/boxes/IconBox";
import ImageBox from "../components/boxes/ImageBox";
import LogoutBox from "../components/boxes/LogoutBox";
import NavigationLinks from "../components/NavigationLinks";
import {
  accountLinks,
  bookmarksLinks,
  profileDataLink,
  sideBarLinks,
} from "../data/Links";

const Bookmarks = () => {
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
          <ImageBox data={profileDataLink} />
        </div>

        <div className="w-full grid grid-cols-2 bg-cd lg:rounded-lg p-2 xl:p-5 gap-2">
          {bookmarksLinks
            ? bookmarksLinks?.map((item) => (
                <ImageBox key={item.name} data={item} />
              ))
            : ""}
        </div>

        <div className="w-full flex flex-col bg-cd lg:rounded-lg p-2 xl:p-5 gap-2">
          {accountLinks
            ? accountLinks.map((item) => (
                <IconBox key={item.name} data={item} />
              ))
            : ""}
          <LogoutBox />
        </div>
      </div>

      {/* right  */}
      <div className="h-[91vh] hidden xl:block w-[30%] sticky top-[9vh] py-2">
        <div className="h-full w-full flex flex-col items-center justify-center gap-5 rounded-lg overflow-y-scroll p-5 bg-cd custom-scrollbar"></div>
      </div>
    </div>
  );
};

export default Bookmarks;
