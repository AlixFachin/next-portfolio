import { useContext } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAppContext } from "@/contexts/fbAppProvider";

const LoginScreen = () => {
  const app = useContext(FirebaseAppContext);
  if (!app) return <p>Woops! Firebase is not initialized...</p>;

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const loginHandler = () => {
    signInWithPopup(auth, provider).then((userCredentials) => {
      console.log(
        `Finished to login with user ${userCredentials.user.displayName}`
      );
    });
  };

  return (
    <div>
      <p>LOGIN SCREEN</p>
      <button onClick={loginHandler}>LOGIN</button>
    </div>
  );
};

export default LoginScreen;
