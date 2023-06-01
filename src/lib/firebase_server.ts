import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export function getFirebaseApp_server(): FirebaseApp {
    const firebaseConfig = {
        apiKey: 'AIzaSyAFRuTARs24MbFS6Wh4YlLUfI-MBkMeXcU',
        authDomain: 'blog-crm-3db84.firebaseapp.com',
        projectId: 'blog-crm-3db84',
        storageBucket: 'blog-crm-3db84.appspot.com',
        messagingSenderId: '545624651853',
        appId: '1:545624651853:web:0f294401f8ea897de74404',
        measurementId: 'G-72JHXBMG6F',
    };
    //TODO: Look for already initialized apps to see if we can skip the app init
    const fbApp = initializeApp(firebaseConfig);
    return fbApp;
}

export async function authenticate_server(fbApp: FirebaseApp) {
    const username = process.env.FB_USERNAME || '';
    const password = process.env.FB_PASSWORD || '';

    const auth = getAuth(fbApp);

    await signInWithEmailAndPassword(auth, username, password);
}
