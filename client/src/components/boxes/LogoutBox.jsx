import LogoutIcon from "@mui/icons-material/Logout";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { logoutUserApi } from "../../app/api/userApi";
import AuthContext from "../../context/AuthUser";

const LogoutBox = () => {
  const { refetch: UserRefetch } = useContext(AuthContext);
  //react quires
  const { isError, data, error, isSuccess, isLoading, refetch } = useQuery({
    queryKey: ["logout-user"],
    queryFn: () => logoutUserApi(),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  // function
  const handleLogout = () => {
    if (!isLoading) {
      refetch();
    }
  };

  //useEffect
  useEffect(() => {
    if (isError) {
      toast.error(error.response.data.message);
    }
    if (isSuccess) {
      toast.success(data.message);
      UserRefetch();
    }
  }, [isError, error, isSuccess, data, UserRefetch]);

  return (
    <div
      className="relative w-full h-[7vh] md:h-[6vh] lg:h-[5vh] xl:h-[8vh] flex bg-ce rounded-lg p-2 gap-4 hover:bg-ce/80 transition-all cursor-pointer"
      onClick={handleLogout}
    >
      {/* left  */}
      <div className="flex items-center justify-center w-[15%]">
        <svg className="h-6 w-6 md:h-10 md:w-10 bg-cc p-1 md:p-2 rounded-full text-ce">
          <LogoutIcon />
        </svg>
      </div>

      {/* right */}
      <div className="h-full w-[80%] flex items-center justify-between text-ca">
        <span className="font-bold">{isLoading ? "loading.." : "logout"}</span>
        <ArrowForwardIosIcon />
      </div>
    </div>
  );
};

export default LogoutBox;
