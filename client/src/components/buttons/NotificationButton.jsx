import { useCallback, useEffect, useRef } from "react";
import Notification from "../../assets/bell-ringing.png";
import NotificationBox from "../boxes/NotificationBox";
import { Link } from "react-router-dom";

const NotificationButton = () => {
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
      className="relative h-full w-full rounded-full bg-ce"
      onClick={() => handleVisibleBox("visible")}
    >
      <img
        src={Notification}
        alt="user"
        className="h-full rounded-full object-contain p-1"
        height={50}
        width={50}
      />

      <div
        className="absolute top-[120%] right-0 bg-cd max-h-[70vh] md:w-[60vw] lg:w-[50vw] xl:w-[30vw] rounded-lg shadow-[0px_20px_50px_-15px_rgba(0,0,0,0.9)] flex flex-col gap-2 p-4 invisible opacity-0 transition-all ease-in-out duration-500"
        ref={ref}
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-ce flex items-center gap-2">
            Notification
          </h2>
          <Link
            to={"/notification"}
            className="text-lg font-bold text-cb hover:underline"
          >
            View all
          </Link>
        </div>

        <hr className="border-b border-ce"></hr>

        <div className="flex flex-col gap-2 overflow-y-scroll custom-scrollbar ">
          <NotificationBox />
          <NotificationBox />
          <NotificationBox />
          <NotificationBox />
          <NotificationBox />
          <NotificationBox />
        </div>
      </div>
    </div>
  );
};

export default NotificationButton;
