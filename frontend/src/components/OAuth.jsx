import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../services/firebase";
import axios from "axios";
import { setUser } from "../redux/reducers/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const auth = getAuth(app);

  const handleGoogleClick = async () => {
    if (isAuthenticating) return;

    setIsAuthenticating(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsfromGoogle = await signInWithPopup(auth, provider);
      const res = await axios.post("/api/auth/google", {
        name: resultsfromGoogle.user.displayName,
        email: resultsfromGoogle.user.email,
        googlePhotoUrl: resultsfromGoogle.user.photoURL,
      });

      const { isNewUser, id, name, email, role, profilePicture, token } =
        res.data;

      const userData = { id, name, email, role, profilePicture };
      dispatch(setUser(userData));

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      if (isNewUser) {
        navigate("/roleSelection", { state: { email } });
      } else {
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <button
      className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-neutral-50 text-neutral-800 font-medium border border-neutral-300 rounded-lg transition-colors duration-300 shadow-sm"
      onClick={handleGoogleClick}
      disabled={isAuthenticating}
    >
      {isAuthenticating ? (
        <svg className="animate-spin h-5 w-5 text-neutral-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg className="w-5 h-5" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
        </svg>
      )}
      <span>
        {isAuthenticating ? "Signing in..." : "Sign in with Google"}
      </span>
    </button>
  );
};

export default OAuth;