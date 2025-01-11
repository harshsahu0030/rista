import { createContext, useLayoutEffect, useState } from "react";
import propTypes from "prop-types";
import { loadUserApi } from "../app/api/userApi";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import PageLoader from "../components/Loader/PageLoader";

const AuthContext = createContext();

export const AuthUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isUser, setIsUser] = useState(true);

  const { isSuccess, data, refetch, error, isError, isLoading } = useQuery({
    queryKey: ["load-user"],
    retry: 1,
    refetchOnWindowFocus: false,
    queryFn: loadUserApi,
  });

  useLayoutEffect(() => {
    if (isLoading) {
      setCurrentUser({});
    }
    if (isSuccess) {
      setCurrentUser(data.data);
      setIsUser(true);
    }

    if (isError) {
      toast.error(error.response.data.message);
      setCurrentUser({});
      setIsUser(false);
    }
  }, [isSuccess, data, isError, error, isLoading]);

  return isLoading ? (
    <PageLoader />
  ) : (
    <AuthContext.Provider
      value={{
        currentUser,
        isUser,
        refetch,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthUserProvider.propTypes = {
  children: propTypes.array,
};

export default AuthContext;
