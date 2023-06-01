import { useContext } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { FirebaseAppContext } from '@/contexts/fbAppProvider';

const LoginScreen = () => {
    const app = useContext(FirebaseAppContext);
    if (!app) return <p>Woops! Firebase is not initialized...</p>;

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account',
    });

    const loginHandler = () => {
        signInWithPopup(auth, provider);
    };

    return (
        <div
            className="mr-8 min-w-fit rounded-md bg-blue-400 p-2 text-center text-white hover:bg-orange-300"
            role="button"
            onClick={loginHandler}
        >
            Sign in
        </div>
    );
};

export default LoginScreen;
