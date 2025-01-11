import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";

const HoverImageUpdate = () => {
  return (
    <div className="absolute flex justify-center items-center top-0 left-0  h-full w-full group-hover/btn:bg-black/70 transition-all duration-300 overflow-hidden" >
      <AddAPhotoOutlinedIcon
        fontSize="large"
        className="text-white invisible group-hover/btn:visible hover:scale-110 transition-all"
      />
    </div>
  );
};

export default HoverImageUpdate;
