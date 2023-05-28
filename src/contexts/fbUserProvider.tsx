import { createContext, useContext, useState } from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { FirebaseAppContext } from './fbAppProvider';

export const FirebaseUserContext = createContext<User | null>(null);

const FirebaseUserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const fbApp = useContext(FirebaseAppContext);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const auth = getAuth(fbApp);

    onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
    });

    return (
        <FirebaseUserContext.Provider value={currentUser}>
            {children}
        </FirebaseUserContext.Provider>
    );
};

export default FirebaseUserProvider;
