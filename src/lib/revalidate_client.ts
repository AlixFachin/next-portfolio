import { FirebaseApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
/**
 * function called to trigger the Next page revalidation. Used when a post has been modified - the corresponding page would have to be modified statically.
 * @param firebaseApp reference to fireBase app (can be client or server side)
 * @param options contains the post Id of the post to be rebuilt. if pages is true, will rebuild all pages.
 */
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