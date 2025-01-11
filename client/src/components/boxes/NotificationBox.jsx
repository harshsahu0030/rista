import User from "../../assets/user.jpg";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const NotificationBox = () => {
  return (
    <div className="relative w-full h-[12vh] md:h-[10vh] lg:h-[8vh] xl:h-[11vh] flex bg-ce rounded-lg p-2 gap-4 hover:bg-ce/80 transition-all group/more cursor-pointer">
      {/* left  */}
      <div className="h-full w-[20%] flex items-center justify-center">
        <img
          src={User}
          alt="img"
          className="h-[80%] object-contain rounded-full"
        />
      </div>

      {/* right */}
      <div className="h-full w-[80%] flex flex-col items-start justify-center text-ca">
        <span className="font-bold">Hello</span>
        <span className="text-sm line-clamp-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,
          possimus!
        </span>
        <span className="text-xs text-cd">1day ago</span>
      </div>

      <button className="absolute p-1 bg-white rounded-full top-[20%] right-[5%] invisible group-hover/more:visible transition-all">
        <MoreVertIcon fontSize="medium" />
      </button>
    </div>
  );
};

export default NotificationBox;
