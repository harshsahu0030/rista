import propTypes from "prop-types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const ImageBox = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full  h-[7vh] md:h-[6vh] lg:h-[5vh] xl:h-[8vh] flex bg-ce rounded-lg p-2 gap-4 hover:bg-ce/80 transition-all cursor-pointer"
      onClick={() => navigate(data?.url)}
    >
      {/* left  */}
      <div className="flex items-center justify-center w-[15%]">
        <img
          src={data?.image}
          alt="image"
          className="h-6 w-6 md:h-10 md:w-10 rounded-full object-cover"
          height={50}
          width={50}
        />
      </div>

      {/* right */}
      <div className="h-full w-[80%] flex items-center justify-between text-ca capitalize">
        <span className="font-bold">{data?.name}</span>
        <ArrowForwardIosIcon />
      </div>
    </div>
  );
};

ImageBox.propTypes = {
  data: propTypes.object,
};

export default ImageBox;
