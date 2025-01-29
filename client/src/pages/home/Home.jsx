import AccountBox from "../../components/boxes/AccountBox";
import ImageBox from "../../components/boxes/ImageBox";
import NotificationBox from "../../components/boxes/NotificationBox";
import NavigationLinks from "../../components/NavigationLinks";
import { sideBarLinks } from "../../data/Links";

const Home = () => {


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
          <NotificationBox />
        </div>
      </div>

      {/* right  */}
      <div className="h-[91vh] hidden xl:block w-[30%] sticky top-[9vh] py-2">
        <div className="h-full w-full flex flex-col items-center justify-center gap-5 rounded-lg overflow-y-scroll p-5 bg-cd custom-scrollbar"></div>
      </div>
    </div>
  );
};

export default Home;
