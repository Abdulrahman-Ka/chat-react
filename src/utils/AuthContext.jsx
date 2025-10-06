/* eslint-disable no-unused-vars */
import { Spinner } from "flowbite-react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { account } from "../lib/appwriteConfig";
import { useNavigate } from "react-router";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserOnLoad();
  }, []);

  const getUserOnLoad = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleUserLogin = async (credentials) => {
    try {
      await account.createEmailPasswordSession({
        email: credentials.email,
        password: credentials.password,
      });
      await getUserOnLoad();
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleUserLogout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserRegister = async (credentials) => {
    try {
      await account.create(
        ID.unique(),
        credentials.email,
        credentials.password,
        credentials.name
      );
      await getUserOnLoad();
      await handleUserLogin(credentials);
    } catch (error) {
      console.error(error);
    }
    navigate("/login");
  };

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
    handleUserRegister,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <Spinner className="md:size-40 size-20  fill-pink-600 m-10 flex  place-self-center " />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
