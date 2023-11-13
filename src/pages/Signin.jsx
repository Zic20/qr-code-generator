import { useRef } from "react";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
import { toast } from "react-toastify";
const Signin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      if (userCredential.user) navigate("/");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };
  return (
    <div className="text-black p-10 bg-white">
      <h1 className="text-center font-semibold  text-3xl mb-2">
        Welcome back!
      </h1>
      <p className="text-center text-gray-700">
        Sign in to continue making magic with us.
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
        <div className="flex flex-col mb-6">
          <label htmlFor="password">Password:</label>
          <input
            className="mt-2 w-full border border-gray-800 rounded-sm p-2 bg-white"
            type="password"
            name="password"
            id="password"
            placeholder="********"
            ref={passwordRef}
          />
          <p className="text-center mt-1">
            Forgot password?{" "}
            <Link className="text-blue-600" to="/forgotpassword">
              Reset password
            </Link>
          </p>
        </div>

        <button className="text-white font-semibold bg-black p-3 rounded-sm w-full md:w-6/12 mx-auto block">
          Sign in
        </button>
        <p className="text-center mt-2">
          {"Don't"} have an account?{" "}
          <Link className="text-blue-600" to="/signup">
            Sign up
          </Link>
        </p>
      </form>

      <hr className="mb-10 md:w-6/12 mx-auto" />
      <GoogleAuth />
    </div>
  );
};

export default Signin;
