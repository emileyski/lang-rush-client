import { getRefreshToken } from "src/utils";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import logout from "src/assets/images/logout.svg";
import { ReactSVG } from "react-svg";
import { useLogoutMutation } from "src/genetated/types";
import { useNavigate } from "react-router-dom";

function Header() {
  const [logOut] = useLogoutMutation();

  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    //TODO: add custom modal (not browser's confirm)
    const sure = window.confirm("Are you sure you want to log out?");
    if (!sure) return;

    await logOut();

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/signin");
  };

  return (
    <header
      className="relative flex justify-center bg-[#2C3659] 
    py-[20px] font-bold uppercase tracking-wider"
    >
      <span className="text-white"> Engl </span>
      <span className="text-[#C5F31D]"> Rush </span>
      <div
        className="absolute right-10 flex items-center
      space-x-10 text-white
      "
      >
        <ThemeToggle />
        {getRefreshToken() && (
          <button onClick={handleLogoutClick}>
            <ReactSVG src={logout} />
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
