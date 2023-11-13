import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRef } from "react";

import { auth, db } from "../firebase/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
import { toast } from "react-toastify";
const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const navigate = useNavigate();

  const onSignUpWithEmailHandler = async (event) => {
    event.preventDefault();
    if (
      emailRef.current.value === "" ||
      passwordRef.current.value === "" ||
      nameRef.current.value === ""
    ) {
      toast.error("Please fill all fields and try again");
      return;
    }
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      const user = response.user;
      updateProfile(auth.currentUser, {
        displayName: nameRef.current.value,
      });

      await setDoc(doc(db, "users", user.uid), {
        name: nameRef.current.value,
        email: user.email,
        timestamp: serverTimestamp(),
      });

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };
  return (
    <div className="text-black p-10 bg-white">
      <h1 className="text-center font-semibold  text-3xl mb-2">
        Get started for free
      </h1>

      <form
        className="px-3 my-10 md:w-6/12 mx-auto"
        onSubmit={onSignUpWithEmailHandler}
      >
        <div className="flex flex-col mb-6">
          <label htmlFor="name">Name:</label>
          <input
            className="mt-2w-full border border-gray-800 rounded-sm p-2 bg-white "
            type="name"
            name="name"
            id="name"
            placeholder="Enter name here"
            ref={nameRef}
          />
        </div>
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
        </div>

        <button className="text-white font-semibold bg-black p-3 rounded-sm w-full md:w-6/12 mx-auto block">
          Sign up
        </button>
        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link className="text-blue-600" to="/signin">
            Sign in
          </Link>
        </p>
      </form>

      <hr className="mb-10 md:w-6/12 mx-auto" />
      <GoogleAuth />
    </div>
  );
};

export default Signup;
