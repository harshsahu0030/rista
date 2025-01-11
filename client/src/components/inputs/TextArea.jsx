import propTypes from "prop-types";

const TextArea = ({
  id,
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  row,
  disable,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-lightGray">
        {label && `${label} :`}
      </label>

      <textarea
        id={id}
        name={name}
        className="bg-transparent outline-none border-2 border-cd focus:border-cc text-black text-base rounded-lg w-full p-2 placeholder:text-cc resize-none disabled:bg-gray-300 disabled:cursor-not-allowed"
        placeholder={placeholder}
        rows={row ? row : 3}
        value={value}
        onChange={onChange}
        disabled={disable}
      ></textarea>

      {error && (
        <span className="text-sm text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
};

TextArea.propTypes = {
  id: propTypes.string,
  label: propTypes.string,
  type: propTypes.string,
  name: propTypes.string,
  placeholder: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
  error: propTypes.string,
  row: propTypes.number,
  disable: propTypes.string,
};

export default TextArea;
