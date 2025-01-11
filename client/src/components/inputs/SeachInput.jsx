import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import propTypes from "prop-types";

const SeachInput = ({ placeholder, value, onChange }) => {
  return (
    <div className="h-full w-full rounded-full overflow-hidden flex items-center px-2 text-cd">
      <SearchOutlinedIcon fontSize="medium" className="" />
      <input
        type="search"
        placeholder={placeholder ? placeholder : ""}
        className="h-full w-full bg-transparent outline-none px-2 text-ce placeholder:capitalize"
        value={value ? value : ""}
        onChange={onChange ? onChange : ""}
      />
    </div>
  );
};

SeachInput.propTypes = {
  placeholder: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
};

export default SeachInput;
