import { NavLink, useLocation } from "react-router-dom";
import { navigationLinks } from "../data/Links";
import { createElement } from "react";

const NavigationLinks = () => {
  const location = useLocation();


  return (
    <div className="w-full bg-ce h-[8vh] md:h-[6vh] xl:h-[8vh] rounded-md flex justify-evenly text-2xl md:text-4xl  text-cc">
      {navigationLinks
        ? navigationLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item?.url}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "relative flex-1 flex justify-center items-center h-full border-b-4 border-cc group/tooltip"
                  : "relative flex-1 flex justify-center items-center h-full hover:bg-cc hover:text-white transition-all ease-in-out duration-200 border-b-4 border-transparent group/tooltip"
              }
            >
              {location?.pathname === item?.url
                ? createElement(item.activeIcon, { fontSize: "inherit" })
                : createElement(item.icon, { fontSize: "inherit" })}

              <span className="invisible opacity-0 text-sm p-2 absolute bg-ca text-ce rounded-lg top-[110%] z-10 group-hover/tooltip:visible group-hover/tooltip:opacity-100 transition-all ease-in-out duration-500 capitalize">
                {item.name}
              </span>
            </NavLink>
          ))
        : ""}
    </div>
  );
};

export default NavigationLinks;
