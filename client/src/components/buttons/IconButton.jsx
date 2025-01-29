import { createElement } from "react";
import propTypes from "prop-types";

const IconButton = ({ name, icon, type, onClick, isPending }) => {
  return (
    <button
      className={`text-xs md:text-base w-fit h-fit py-2 px-3 rounded-md flex items-center justify-center gap-2 capitalize font-bold  border border-cc transition-all duration-300 ${
        type === "dark"
          ? "bg-cc text-white hover:bg-cc/80"
          : "bg-ce text-ca hover:bg-cd/10"
      }`}
      onClick={onClick ? onClick : () => {}}
      disabled={isPending}
    >
      {icon && createElement(icon, { fontSize: "medium" })}
      {isPending ? "loading..." : name}
    </button>
  );
};

IconButton.propTypes = {
  name: propTypes.string,
  icon: propTypes.object,
  type: propTypes.string,
  onClick: propTypes.func,
  isPending: propTypes.bool,
};

export default IconButton;
