import logo from "../../assets/logo.png";
import ChangePasswordComponent from "../../components/authentication/ChangePasswordComponent";

const ChangePassword = () => {
  return (
    <div className="flex min-h-[91vh] w-full justify-between gap-2 xl:gap-20">
      {/* left  */}
      <div className="h-[91vh] hidden lg:block w-[30%] sticky top-[9vh] py-2">
        <div className="h-full w-full flex flex-col items-center justify-center gap-5 rounded-lg overflow-y-scroll p-5 bg-cd custom-scrollbar">
          <img src={logo} alt="logo" className="w-[50%] object-contain" />
          <h2 className="text-4xl font-medium">Rishta</h2>
          <p className="font-semibold text-xl text-ca text-center">
            Building the future of human connection and the technology that
            makes it possible.
          </p>
        </div>
      </div>

      {/* center  */}
      <div className="flex flex-col w-[100%] lg:w-[70%] xl:w-[50%] lg:p-2 gap-2">
        <div className="w-full flex flex-col bg-cd lg:rounded-lg p-2 xl:p-5">
          <ChangePasswordComponent />
        </div>
      </div>

      {/* right  */}
      <div className="h-[91vh] hidden xl:block w-[30%] sticky top-[9vh] py-2">
        <div className="h-full w-full flex flex-col items-center justify-center gap-5 rounded-lg overflow-y-scroll p-5 bg-cd custom-scrollbar">
          <img src={logo} alt="logo" className="w-[50%] object-contain" />
          <h2 className="text-4xl font-medium">Rishta</h2>
          <p className="font-semibold text-xl text-ca text-center">
            Building the future of human connection and the technology that
            makes it possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
