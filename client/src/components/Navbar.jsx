import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Menu from "../assets/menu.png";
import AccountButton from "./buttons/AccountButton";
import NotificationButton from "./buttons/NotificationButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchButton from "./buttons/SearchButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useContext } from "react";
import AuthContext from "../context/AuthUser";

const Navbar = () => {
  const navigate = useNavigate();
  const { isUser } = useContext(AuthContext);

  return (
    <div className="h-full w-full bg-ca flex items-center justify-between">
      {/* left  */}
      <div className="h-full flex gap-4 items-center">
        <img
          src={logo}
          alt="logo"
          className="mix-blend-difference h-full object-contain cursor-pointer"
          onClick={() => navigate("/")}
          height={50}
          width={50}
        />

        <div className="h-10 w-[100%] hidden md:block">
          {isUser && <SearchButton />}
        </div>
      </div>

      {isUser && (
        <>
          {/* right  */}
          <div className=" h-full hidden md:flex gap-4 items-center pr-2 ">
            <Link to={"/bookmarks"} className="h-10 w-10">
              <img
                src={Menu}
                alt="menu"
                className="h-full rounded-full object-contain p-1 bg-ce"
                height={50}
                width={50}
              />
            </Link>

            <div className="h-10 w-10">
              <NotificationButton />
            </div>

            <div className="h-10 w-10">
              <AccountButton />
            </div>
          </div>

          <div className=" h-full flex md:hidden gap-4 items-center pr-2">
            <Link
              to={"/search"}
              className="h-10 w-10 rounded-full p-1 bg-ce flex items-center justify-center"
            >
              <SearchOutlinedIcon fontSize="large" />
            </Link>
            <Link
              to={"/bookmarks"}
              className="h-10 w-10 rounded-full p-1 bg-ce flex items-center justify-center"
            >
              <MenuIcon fontSize="large" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
