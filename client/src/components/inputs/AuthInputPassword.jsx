import { useState } from "react";
import propTypes from "prop-types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const AuthInputPassword = ({
  id,
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  disable,
}) => {
  //ref
  const [inputType, setInputType] = useState(type);

  //functions
  const handlePasswordLook = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-lightGray">
        {label && `${label} :`}
      </label>
      <div className="relative flex items-center">
        <input
          type={inputType && inputType}
          id={id && id}
          name={name && name}
          className="bg-transparent outline-none border-2 border-cd focus:border-cc text-black text-base rounded-lg w-full p-2 placeholder:text-cc disabled:bg-gray-300 disabled:cursor-not-allowed"
          placeholder={placeholder && placeholder}
          value={value && value}
          onChange={onChange && onChange}
          autoComplete="off"
          disabled={disable}
        />
        <div
          className="absolute right-0 flex items-center px-3 cursor-pointer text-cd"
          onClick={() => handlePasswordLook()}
        >
          {inputType === "password" ? (
            <VisibilityIcon />
          ) : (
            <VisibilityOffIcon />
          )}
        </div>
      </div>
      {error && (
        <span className="text-sm text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
};

AuthInputPassword.propTypes = {
  id: propTypes.string,
  label: propTypes.string,
  icon: propTypes.func,
  type: propTypes.string,
  defaultValue: propTypes.number,
  name: propTypes.string,
  placeholder: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
  error: propTypes.string,
  disabled: propTypes.bool,
  disable: propTypes.bool,
};

export default AuthInputPassword;
