import { createElement } from "react";
import propTypes from "prop-types";

const IconButton = ({ name, icon, type, onClick }) => {
  return (
    <button
      className={`text-xs md:text-base w-fit h-fit py-2 px-3 rounded-md flex items-center justify-center gap-2 capitalize font-bold  border border-cc transition-all duration-300 ${
        type === "dark"
          ? "bg-cc text-white hover:bg-cc/80"
          : "bg-ce text-ca hover:bg-cd/10"
      }`}
      onClick={onClick ? onClick : () => {}}
    >
      {icon && createElement(icon, { fontSize: "medium" })}
      {name}
    </button>
  );
};

IconButton.propTypes = {
  name: propTypes.string,
  icon: propTypes.object,
  type: propTypes.string,
  onClick: propTypes.func,
};

export default IconButton;
