import { useCallback, useEffect, useRef, useState } from "react";
import SeachInput from "../inputs/SeachInput";
import SearchUserBox from "../boxes/SearchUserBox";
import { profileDataLink } from "../../data/Links";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/Debounce";
import { getUsersApi } from "../../app/api/userApi";
import { useQuery } from "@tanstack/react-query";

const SearchButton = () => {
  const navigate = useNavigate();

  //states
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery);
  const [debouceLoading, setDebouceLoading] = useState(false);

  //ref
  const outerRef = useRef();
  const ref = useRef();

  //query
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-users"],
    queryFn: () => getUsersApi({ search: searchQuery }),
  });

  //functions
  const handleVisibleBox = (val) => {
    if (val === "visible") {
      ref.current.classList.add("visible");
    } else {
      ref.current.classList.remove("visible");
    }
  };

  const handleClickOutside = useCallback((event) => {
    if (outerRef.current && !outerRef.current.contains(event.target)) {
      handleVisibleBox();
    }
  }, []);

  //functions
  const onChange = (e) => {
    setSearchQuery(e.target.value);
    setDebouceLoading(true);
  };

  let handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?keyword=${searchQuery}`);
  };

  //useEffect
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  // useEffect
  useEffect(() => {
    const loadUsers = async () => {
      await refetch(debouncedSearch);
      setDebouceLoading(false);
    };

    loadUsers();
  }, [debouncedSearch, refetch]);

  return (
    <div
      ref={outerRef}
      className="h-full w-full rounded-full bg-ce/10 cursor-pointer"
      onClick={() => handleVisibleBox("visible")}
    >
      <form
        onSubmit={handleSearchSubmit}
        className="h-full w-full rounded-full overflow-hidden flex items-center px-2 text-cd"
      >
        <SeachInput
          placeholder="Search Rista"
          value={searchQuery}
          onChange={onChange}
        />
      </form>

      <div
        className="absolute top-[100%] left-0 bg-cd max-h-[70vh] md:w-[50vw] lg:w-[40vw] xl:w-[25vw] rounded-lg shadow-[0px_20px_50px_-15px_rgba(0,0,0,0.9)] flex flex-col gap-2 p-4 invisible opacity-0 transition-all ease-in-out duration-500"
        ref={ref}
      >
        <div className="flex flex-col gap-2 overflow-y-scroll custom-scrollbar ">
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
    </div>
  );
};

export default SearchButton;
