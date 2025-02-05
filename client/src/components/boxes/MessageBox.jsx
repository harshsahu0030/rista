import { useContext } from "react";
import User from "../../assets/user.jpg";
import AuthContext from "../../context/AuthUser";

const MessageBox = () => {
  const { currentUser } = useContext(AuthContext);
  let loginUser = false;

  return (
    <div className={`w-[100%] flex gap-1 ${loginUser ? "justify-end" : ""}`}>
      <div className="w-fit max-w-[80%] flex gap-1">
        {/* left  */}
        <div className="w-[10%] flex justify-center">
          {!loginUser && (
            <img
              src={currentUser?.avatar?.url ? currentUser?.avatar?.url : User}
              alt="image"
              className="h-6 w-6 md:h-10 md:w-10 rounded-full object-cover bg-white"
              height={50}
              width={50}
            />
          )}
        </div>

        {/* right  */}
        <div className="flex flex-col gap-1 py-2 px-4 bg-ce rounded-lg w-[90%]">
          {!loginUser && <span className="font-bold text-cc">Damini</span>}
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident
            pariatur quos aspernatur, nostrum quod reiciendis a, alias nisi enim
            perferendis cumque quasi, accusantium neque voluptatum voluptates
            fuga illum accusamus laboriosam!
          </p>
          <span className="flex justify-end text-xs text-ca/60 font-medium italic">
            1 day ago
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
