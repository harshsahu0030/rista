import { useEffect, useState } from "react";
import ImageBox from "../../components/boxes/ImageBox";
import SeachInput from "../../components/inputs/SeachInput";
import NavigationLinks from "../../components/NavigationLinks";
import { sideBarLinks } from "../../data/Links";
import SearchUserBox from "../../components/boxes/SearchUserBox";
import { useQuery } from "@tanstack/react-query";
import { getUsersApi } from "../../app/api/userApi";
import { useDebounce } from "../../hooks/Debounce";
import AccountBox from "../../components/boxes/AccountBox";

const Search = () => {
  //states
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery);
  const [debouceLoading, setDebouceLoading] = useState(false);

  //query
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-users"],
    queryFn: () => getUsersApi({ search: searchQuery }),
  });

  //functions
  const onChange = (e) => {
    setSearchQuery(e.target.value);
    setDebouceLoading(true);
  };

  // useEffect
  useEffect(() => {
    const loadUsers = async () => {
      await refetch(debouncedSearch);
      setDebouceLoading(false);
    };

    loadUsers();
  }, [debouncedSearch, refetch]);

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

        <div className="w-full flex flex-col bg-cd lg:rounded-lg p-2 xl:p-5 gap-2 md:hidden">
          <div className="w-full p-4 rounded-full bg-cb">
            <SeachInput
              placeholder="Search Rista"
              value={searchQuery}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="w-full flex flex-col bg-cd lg:rounded-lg p-2 xl:p-5 gap-2">
          {isLoading || debouceLoading ? (
            <span className="font-semibold text-ce">loading...</span>
          ) : data && data?.data?.length > 0 ? (
            data?.data?.map((item) => (
              <SearchUserBox key={item._id} data={item} />
            ))
          ) : (
            <span className="font-semibold text-ce">No User Found</span>
          )}
        </div>
      </div>

      {/* right  */}
      <div className="h-[91vh] hidden xl:block w-[30%] sticky top-[9vh] py-2">
        <div className="h-full w-full flex flex-col items-center justify-center gap-5 rounded-lg overflow-y-scroll p-5 bg-cd custom-scrollbar"></div>
      </div>
    </div>
  );
};

export default Search;
