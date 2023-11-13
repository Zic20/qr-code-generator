import { useLocation, useNavigate } from "react-router";
import Google_icon from "../assets/Google__Logo.svg";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
const GoogleAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onClickHandler = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          timestamp: serverTimestamp(),
        });
      }

      navigate("/");
    } catch (error) {
      toast.error("Could not authenticate account. Please try again.");
    }
  };
  return (
    <button
      onClick={onClickHandler}
      className="border border-black flex mx-auto p-3 rounded-sm bg-white font-semibold"
    >
      <img className="mr-2" src={Google_icon} alt="" />
      Sign {location.pathname.includes("signup") ? "up" : "in"} with Google
    </button>
  );
};

export default GoogleAuth;
