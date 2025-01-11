import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import propTypes from "prop-types";
import { createElement } from "react";
import { useNavigate } from "react-router-dom";

const IconBox = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-[7=1vh] md:h-[6vh] lg:h-[5vh] xl:h-[8vh] flex bg-ce rounded-lg p-2 gap-4 hover:bg-ce/80 transition-all"
      onClick={() => navigate(data.url)}
    >
      {/* left  */}
      <div className="flex items-center justify-center h-full w-[15%] md:w-[10%] ">
        <svg className="h-10 w-10 bg-cc p-2 rounded-full text-ce">
          {data?.icon && createElement(data.icon)}
        </svg>
      </div>

      {/* right */}
      <div className="h-full w-[80%] flex items-center justify-between text-ca">
        <span className="font-bold">{data?.name}</span>
        <ArrowForwardIosIcon />
      </div>
    </div>
  );
};

IconBox.propTypes = {
  data: propTypes.object,
};

export default IconBox;
