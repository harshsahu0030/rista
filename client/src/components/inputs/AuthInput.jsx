import propTypes from "prop-types";

const AuthInput = ({
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
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-lightGray">
        {label && `${label} :`}
      </label>

      <input
        type={type}
        id={id}
        name={name}
        className="bg-transparent outline-none border-2 border-cd focus:border-cc text-black text-base rounded-lg w-full p-2 placeholder:text-cc disabled:bg-gray-300 disabled:cursor-not-allowed"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        max={new Date().toISOString().split("T")[0]}
        disabled={disable}
      ></input>

      {error && (
        <span className="text-sm text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
};

AuthInput.propTypes = {
  id: propTypes.string,
  label: propTypes.string,
  type: propTypes.string,
  name: propTypes.string,
  placeholder: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
  error: propTypes.string,
  disable: propTypes.bool,
};

export default AuthInput;
