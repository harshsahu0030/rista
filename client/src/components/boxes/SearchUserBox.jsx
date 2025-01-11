import propTypes from "prop-types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const SearchUserBox = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[10vh] md:h-[8vh] lg:h-[7vh] xl:h-[10vh] flex bg-ce rounded-lg p-2 gap-4 hover:bg-ce/80 transition-all cursor-pointer" onClick={()=> navigate(data?.user)}>
      {/* left  */}
      <div className="flex items-center justify-center h-full w-[20%] ">
        <img
          src={data.image}
          alt="image"
          className="h-full rounded-full object-contain"
        />
      </div>

      {/* right */}
      <div className="h-full w-[80%] flex items-center justify-between text-ca">
        <div className="flex flex-col">
          <span className="font-bold text-lg line-clamp-1">
            {data.userName}
          </span>
          <span className="text-sm li">
            <span className="font-medium text-base">{data.name}</span> ~ 10
            Mutual people
          </span>
        </div>
        <ArrowForwardIosIcon />
      </div>
    </div>
  );
};

SearchUserBox.propTypes = {
  data: propTypes.object,
};

export default SearchUserBox;
