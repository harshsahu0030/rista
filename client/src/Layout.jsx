import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import AuthContext from "./context/AuthUser";

//all
export const Every = () => {
  return (
    <div className="min-h-screen max-w-screen default">
      {/* header  */}
      <header className="h-[9vh] sticky top-0 z-10">
        <Navbar />
      </header>

      {/* body  */}
      <main className="min-h-[91vh] bg-ce">
        <Outlet />
      </main>

      {/* footer  */}
      <footer className=""></footer>
    </div>
  );
};

//authentication
export const Authentication = () => {
  const { isUser } = useContext(AuthContext);

  if (!isUser) {
    return (
      <div className="min-h-screen max-w-screen default">
        {/* header  */}
        <header className="h-[9vh] sticky top-0 z-10">
          <Navbar />
        </header>

        {/* body  */}
        <main className="min-h-[91vh] bg-ce">
          <Outlet />
        </main>

        {/* footer  */}
        <footer className=""></footer>
      </div>
    );
  } else {
    return <Navigate to="/home" />;
  }
};

// authenticated
export const AuthenticatedUser = () => {
  const { isUser } = useContext(AuthContext);

  if (isUser) {
    return (
      <div className="min-h-screen max-w-screen default">
        {/* header  */}
        <header className="h-[9vh] sticky top-0 z-10">
          <Navbar />
        </header>

        {/* body  */}
        <main className="min-h-[91vh] bg-ce">
          <Outlet />
        </main>

        {/* footer  */}
        <footer className=""></footer>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};
