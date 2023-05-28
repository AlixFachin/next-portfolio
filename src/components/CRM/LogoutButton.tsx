import { useContext } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAppContext } from "@/contexts/fbAppProvider";
import { fb_logOut } from "@/lib/firebase";

const LogoutButton = () => {
  const app = useContext(FirebaseAppContext);
  if (!app) return <p>Woops! Firebase is not initialized...</p>;

  const auth = getAuth(app);

  const logoutHandler = () => {
    fb_logOut(auth);
  };

  return (
    <div
      className="mr-8 min-w-fit rounded-md bg-blue-400 text-center p-2 text-white hover:bg-orange-300"
      role="button"
      onClick={logoutHandler}
    >
      Logout
    </div>
  );
};

export default LogoutButton;
