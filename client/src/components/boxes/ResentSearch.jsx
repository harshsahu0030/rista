import { Link } from "react-router-dom";

const ResentSearch = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <h2 className="text-base font-bold text-ce flex items-center gap-2">
          Recent searches
        </h2>
        <Link
          to={"/search/recent"}
          className="text-base font-bold text-cb hover:underline"
        >
          View all
        </Link>
      </div>
      <hr className="border-b border-ce"></hr>
    </div>
  );
};

export default ResentSearch;
