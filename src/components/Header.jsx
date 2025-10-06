import { LuLogOut } from "react-icons/lu";
import { useAuth } from "../utils/AuthContext";

const Header = () => {
  const { user, handleUserLogout } = useAuth();

  return (
    <div className="flex mx-auto text-3xl p-1 mt-8 items-center justify-between gap-1 md:w-1/2">
      {user ? (
        <>
          Welcome {user.name}
          <button onClick={handleUserLogout}>
            <LuLogOut />
          </button>
        </>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
};
export default Header;
