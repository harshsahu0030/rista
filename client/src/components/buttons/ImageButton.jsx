import propTypes from "prop-types";
import User from "../../assets/user02.webp";

const ImageButton = ({ name, image, type, onClick }) => {
  return (
    <button
      className={`text-sm md:text-base w-fit h-fit py-2 px-3 rounded-md flex items-center justify-center gap-2 capitalize font-bold  border border-cc transition-all duration-300 ${
        type === "dark"
          ? "bg-cc text-white hover:bg-cc/80"
          : "bg-ce text-ca hover:bg-cd/10"
      }`}
      onClick={onClick ? onClick : () => {}}
    >
      {image ? (
        <img
          src={image}
          alt="user-image"
          className="h-full rounded-full object-contain"
        />
      ) : (
        <img
          src={User}
          alt="user-image"
          className="h-full rounded-full object-contain"
        />
      )}
      {name}
    </button>
  );
};

ImageButton.propTypes = {
  name: propTypes.string,
  image: propTypes.string,
  type: propTypes.string,
  onClick: propTypes.func,
};

export default ImageButton;
