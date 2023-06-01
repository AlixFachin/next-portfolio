import { FirebaseApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const revalidatePages = async (firebaseApp: FirebaseApp, options?: { postId?: string, pages?: boolean } ) => {

    const auth = getAuth(firebaseApp);
        auth.currentUser?.getIdToken(false).then((idToken) => {
            
            
            const postParam = options && options.postId ? `postId=${options.postId}` : '';
            const pagesParam = options && options.pages ? `pages=true` : '';
            const firstToken = options && (options.postId || options.pages) ? '?' : '';
            const secondToken = postParam !== '' && pagesParam !== '' ? '&' : '';

            const queryURL = '/api/revalidate' + firstToken + postParam + secondToken + pagesParam ;           
            console.log(`Sending query ${queryURL}`);

            // send the token to the back-end
            fetch(queryURL, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            }).then(() => {
                console.log(`Request sent!`)
            }).catch((err) => {
                console.error(`Error in the Next revalidate POST query!`,err);
            })
        }).catch((err)=> {
            console.error(`Error inside the getIdToken of the auth part of rebuild function`, err);
        })

};

export default revalidatePages;