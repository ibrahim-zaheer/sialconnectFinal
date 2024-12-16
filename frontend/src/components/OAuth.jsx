import { Button } from "flowbite-react";
import React, { useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../services/firebase";
import axios from "axios";
import { setUser } from "../redux/reducers/userSlice"; // Import your Redux action

const OAuth = () => {
  const dispatch = useDispatch(); // Initialize Redux dispatch
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false); // Track authentication state

  const auth = getAuth(app);

  // const handleGoogleClick = async () => {
  //   // Prevent additional requests if already authenticating
  //   if (isAuthenticating) return;

  //   setIsAuthenticating(true); // Set authenticating state to true
  //   const provider = new GoogleAuthProvider();
  //   provider.setCustomParameters({ prompt: "select_account" });

  //   try {
  //     const resultsfromGoogle = await signInWithPopup(auth, provider);
  //     console.log("Google Sign-In Result:", resultsfromGoogle);

  //     const res = await axios.post("/api/auth/google", {
  //       name: resultsfromGoogle.user.displayName,
  //       email: resultsfromGoogle.user.email,
  //       googlePhotoUrl: resultsfromGoogle.user.photoURL,
  //     });

  //     if (res.status === 200) {
  //       const { name, email, role, token } = res.data; // Extract data from the backend response
  //       const userData = { name, email, role }; // Prepare user data for Redux store

  //       // Update Redux store
  //       dispatch(setUser(userData));

  //       // Store token and user data in localStorage
  //       localStorage.setItem("user", JSON.stringify(userData));
  //       localStorage.setItem("token", token);

  //       navigate("/roleSelection",{ state: { email: email } }); // Redirect to the home page
  //     } else {
  //       console.error("Failed to authenticate user via Google.");
  //     }
  //   } catch (error) {
  //     console.error("Error during Google Sign-In:", error);
  //   } finally {
  //     setIsAuthenticating(false); // Re-enable button after completion
  //   }
  // };

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

      const { isNewUser, role, token, name, email } = res.data;

      // Store user details in Redux and localStorage
      const userData = { name, email, role };
      dispatch(setUser(userData));
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      if (isNewUser) {
        // Redirect to role selection if the user is new
        navigate("/roleSelection", { state: { email } });
      } else {
        // Redirect to home/dashboard if the user already exists
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <Button
      className="w-[40vw] bg-red-200 h-full"
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
      disabled={isAuthenticating} // Disable button while authenticating
    >
      <AiFillGoogleCircle className="" />
      Sign in with Google
    </Button>
  );
};

export default OAuth;

// import { Button } from "flowbite-react";
// import React, { useState } from "react";
// import { AiFillGoogleCircle } from "react-icons/ai";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { app } from "../services/firebase";
// import axios from "axios";

// const OAuth = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isAuthenticating, setIsAuthenticating] = useState(false); // Track authentication state

//   const auth = getAuth(app);

//   const handleGoogleClick = async () => {
//     // Prevent additional requests if already authenticating
//     if (isAuthenticating) return;

//     setIsAuthenticating(true); // Set authenticating state to true
//     const provider = new GoogleAuthProvider();
//     provider.setCustomParameters({ prompt: "select_account" });

//     try {
//       const resultsfromGoogle = await signInWithPopup(auth, provider);
//       console.log(resultsfromGoogle);

//       const res = await fetch("/api/auth/google", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: resultsfromGoogle.user.displayName,
//           email: resultsfromGoogle.user.email,
//           googlePhotoUrl: resultsfromGoogle.user.photoURL,
//         }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//           const { name, email, role, token } = res.data; // Extract data from the backend response
//         const userData = { name, email, role }; // Prepare user data for Redux store

//         // Update Redux store
//         dispatch(setUser(userData));

//         // Store token and user data in localStorage
//         localStorage.setItem("user", JSON.stringify(userData));
//         localStorage.setItem("token", token);
//         navigate("/home");
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsAuthenticating(false); // Re-enable button after completion
//     }
//   };

//   return (
//     <Button
//       type="button"
//       gradientDuoTone="pinkToOrange"
//       outline
//       onClick={handleGoogleClick}
//       disabled={isAuthenticating} // Disable button while authenticating
//     >
//       <AiFillGoogleCircle className="w-6 h-6 mr-2" />
//       Sign in with Google
//     </Button>
//   );
// };

// export default OAuth;
