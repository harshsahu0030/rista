import { useCallback, useContext, useEffect, useRef } from "react";
import User from "../../assets/user.jpg";
import { accountLinks } from "../../data/Links";
import LogoutBox from "../boxes/LogoutBox";
import IconBox from "../boxes/IconBox";
import AccountBox from "../boxes/AccountBox";
import AuthContext from "../../context/AuthUser";

const AccountButton = () => {
  const { currentUser } = useContext(AuthContext);
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
      className="relative h-full w-full rounded-full bg-ce "
      onClick={() => handleVisibleBox("visible")}
    >
      <img
        src={currentUser?.avatar?.url ? currentUser?.avatar?.url : User}
        alt="user"
        className="w-full h-full rounded-full object-cover cursor-pointer"
        height={50}
        width={50}
      />

      <div
        className="absolute top-[120%] right-0 bg-cd max-h-[70vh] w-[50vw] xl:w-[30vw] rounded-lg shadow-[0px_20px_50px_-15px_rgba(0,0,0,0.9)] flex flex-col gap-2 p-4 invisible opacity-0 transition-all ease-in-out duration-500"
        ref={ref}
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-ce">Account</h2>
        </div>

        <hr className="border-b border-ce"></hr>

        <div className="flex flex-col gap-2">
          <AccountBox />

          {accountLinks
            ? accountLinks.map((item) => (
                <IconBox key={item.name} data={item} />
              ))
            : ""}

          <LogoutBox />
        </div>
      </div>
    </div>
  );
};

export default AccountButton;
