import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

const BackBox = ({ name, url }) => {
  const navigate = useNavigate();

  //function
  const handleBack = () => {
    navigate(url ? url : -1);
  };
  return (
    <div className="w-full bg-ce p-2 rounded-lg flex gap-4 items-center capitalize">
      <button
        className="hover:scale-110 hover:text-cc transition-all"
        onClick={handleBack}
      >
        <ArrowBackIcon />
      </button>
      <h1 className="text-xl font-semibold">{name}</h1>
    </div>
  );
};

BackBox.propTypes = {
  name: propTypes.string,
  url: propTypes.string,
};

export default BackBox;
