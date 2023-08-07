import type { NextApiRequest, NextApiResponse } from 'next';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

/**
 * Revalidation API Route handler
 * 
 * https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration
 * 
 * In the Next.js example, it is suggested for the client to send a secret token, and for the server side to check 
 * this token to guard the page re-building against over-use
 * In my case, the client code is the same for the CMS app and the client app, so there is a risk (?)
 * that the secret is shipped on the client side, even when the client is not authorized
 * I will then use the Firebase authentication to see if the user is allowed to perform such thing, in the following way:
 * 
 * - The client gets its individual auth token from Firebase auth
 * - The client sends the request, with the token as a bearer auth header
 * - The server parses the auth header and verifies with the FireBase Admin SDK the user profile
 * - The server will compare the user UID with a pre-determined acceptable UID. If OK, then allow for page revalidation
 */

// -=-=-=-=-=-=-=-=-=-=-

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {

        // console.log(`Received revalidate query!`);
        // console.log(`Bearer token = ${req.headers?.authorization}`);

        if (!req.headers.authorization || req.headers.authorization.substring(0, 'bearer'.length).toLowerCase() !== 'bearer') {
            return res.status(401).send('Invalid authorization header!');
        }
        const fbToken = req.headers.authorization.substring('bearer '.length);

        const allApps = getApps();
        const fbAdminApp = allApps.find((app) => app.name === 'adminApp') || initializeApp({
            projectId: 'blog-crm-3db84',
            storageBucket: 'blog-crm-3db84.appspot.com',            
        },'adminApp');
        const decodedToken = await getAuth(fbAdminApp).verifyIdToken(fbToken);

        if (process.env.ISR_UID === '') {
            console.error(
                'Incremental static regeneration not setup on the server!'
            );
            return res
                .status(500)
                .send(
                    'Incremental static regeneration not setup on the server!'
                );
        }

        if (decodedToken.uid === process.env.ISR_UID) {
            // Re-validating static root pages
            await res.revalidate('/');
            await res.revalidate('/posts');

            // revalidating the post which was modified (if indicated)
            if (req.query.postId) {
                await res.revalidate(`/posts/${req.query.postId}`);
            }

            // TODO: If there is a parameter for "pages", re-validating all the pages
            //  not a lot of pages, so might as well revalidate them all in one go
            if (req.query.pages && req.query.pages === 'true') {
                await res.revalidate('/404');
                await res.revalidate('/about');
            }

            return res.json({ revalidated: true });
        }        

        return res.status(401).send('Error in user authentication / authorization');

    } catch (err) {
        // If there was an error, next.js will continue to display
        // last generated page
        console.error(`Error found in revalidation!`, err);
        return res.status(500).send('Error revalidating');
    }
}
