import { useRef } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const ForgotPassword = () => {
  const emailRef = useRef();
  const navigate = useNavigate();
  const onSubmitHandler = async (event) => {
    if (emailRef.current.value === "") {
      toast.error("Please provide your email.");
      return;
    }

    try {
      const auth = getAuth();
      sendPasswordResetEmail(auth, emailRef.current.value);
      event.preventDefault();
      navigate("/signin");
    } catch (error) {
      toast.error("Something went wrong please try again.");
    }
  };
  return (
    <div className="text-black px-10 py-24 bg-white h-screen">
      <h1 className="text-center font-semibold  text-3xl mb-2">
        Password Reset
      </h1>
      <p className="text-center text-gray-700">
        Enter your email to receive password reset code
      </p>
      <form className="px-3 my-10 md:w-6/12 mx-auto" onSubmit={onSubmitHandler}>
        <div className="flex flex-col mb-6">
          <label htmlFor="email">Email:</label>
          <input
            className="mt-2w-full border border-gray-800 rounded-sm p-2 bg-white "
            type="email"
            name="email"
            id="email"
            placeholder="user@qrcodegenerator.com"
            ref={emailRef}
          />
        </div>

        <button className="text-white font-semibold bg-black p-3 rounded-sm w-full md:w-6/12 mx-auto block">
          Send Code
        </button>
        <p className="text-center mt-2">
          Remembered your password?{" "}
          <Link className="text-blue-600" to="/signin">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
