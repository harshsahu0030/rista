import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import IconButton from "../buttons/IconButton";

const RequestBox = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[7vh] md:h-[6vh] lg:h-[5vh] xl:h-[8vh] flex bg-ce rounded-lg p-2 gap-4 hover:bg-ce/80 transition-all cursor-pointer justify-between flex-wrap overflow-y-scroll">
      {/* left  */}
      <div
        className="flex items-center justify-center h-full gap-4"
        onClick={() => navigate(data?.url)}
      >
        <img
          src={data?.image}
          alt="image"
          className="h-full rounded-full object-contain"
        />

        <div className="flex flex-col">
          <span className="font-bold line-clamp-1">{data?.userName}</span>
          <span className="text-cb text-sm line-clamp-1">{data?.name}</span>
        </div>
      </div>

      {/* right */}
      <div className="h-full flex items-center justify-between text-ca capitalize">
        <div className="flex gap-2">
          <IconButton name="confirm" type="dark" />
          <IconButton name="decline" type="" />
        </div>
      </div>
    </div>
  );
};

RequestBox.propTypes = {
  data: propTypes.object,
};

export default RequestBox;