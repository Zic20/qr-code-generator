import { useNavigate } from "react-router";
import { useAuth } from "../firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { authUser, logout } = useAuth();
  const navigate = useNavigate();
  const onLogoutHandler = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      logout();
      navigate("/signin");
    } catch (error) {
      toast.error("Sign out failed.");
    }
  };
  return (
    <div className="bg-white text-black shadow-md p-5 flex place-items-center justify-between top-0 sticky z-10">
      <h1 className="font-bold text-xl">QR Code Generator</h1>
      {authUser ? (
        <div className="flex place-items-center">
          <p className="text-black font-bold mr-10">{authUser?.name}</p>
          <button
            onClick={onLogoutHandler}
            className="bg-black text-white px-6 py-2 rounded-sm uppercase hover:shadow-md hover:-translate-y-1 active:translate-y-0"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate("/signin")}
          className="bg-black text-white px-6 py-2 rounded-sm uppercase hover:shadow-md hover:-translate-y-1 active:translate-y-0"
        >
          Sign in
        </button>
      )}
    </div>
  );
};

export default Navbar;
