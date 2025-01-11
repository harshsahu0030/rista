import { useCallback, useEffect, useRef, useState } from "react";
import SeachInput from "../inputs/SeachInput";
import SearchUserBox from "../boxes/SearchUserBox";
import { profileDataLink } from "../../data/Links";
import { useNavigate } from "react-router-dom";

const SearchButton = () => {
  const navigate = useNavigate();

  //states
  const [searchQuery, setSearchQuery] = useState("");

  //ref
  const outerRef = useRef();
  const ref = useRef();

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

  const onChange = (e) => {
    setSearchQuery(e.target.value);
  };

  let handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/search");
  };

  //useEffect
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

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
        <div className="flex flex-col gap-2 overflow-y-scroll custom-scrollbar "></div>
        <SearchUserBox data={profileDataLink} />
      </div>
    </div>
  );
};

export default SearchButton;
