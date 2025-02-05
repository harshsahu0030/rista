import propTypes from "prop-types";
import SendIcon from '@mui/icons-material/Send';

const MessageInput = ({ placeholder, value, onChange }) => {
  return (
    <div className="h-full w-full rounded-lg overflow-hidden flex items-center px-2 text-ca bg-ce">
      <textarea
        name="search-input"
        type="text"
        placeholder={placeholder ? placeholder : ""}
        className="h-full w-full bg-transparent outline-none px-2 placeholder:capitalize flex items-center"
        value={value ? value : ""}
        onChange={onChange ? onChange : ""}
        autoComplete="off"
        rows={1}
      />
      <SendIcon fontSize="medium" className="cursor-pointer hover:scale-110 hover:text-cc transition-all" />
    </div>
  );
};

MessageInput.propTypes = {
  placeholder: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
};

export default MessageInput;
