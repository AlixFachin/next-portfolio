import { FirebaseApp } from 'firebase/app';
import { Auth, signOut } from 'firebase/auth';
import {
    QuerySnapshot,
    Timestamp,
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    where,
} from 'firebase/firestore';
import {
    PostData,
    PostData_z,
    PostMetaData,
    PostMetaData_z,
} from './posts';
import { GetStaticPathsResult } from 'next';

export function fb_logOut(firebaseAuth: Auth): void {
    signOut(firebaseAuth).catch((error) => console.error(error));
}

export async function fb_getPostById(
    firebaseApp: FirebaseApp,
    postId: string
): Promise<PostData | null> {
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, 'posts', postId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return null;
    }

    const postData = PostData_z.parse({
        ...docSnap.data(),
        published: docSnap.data().published.toDate().toISOString(),
        id: postId,
    });

    return { ...postData };
}

export async function fb_getAllPostsMetaDataList(
    firebaseApp: FirebaseApp,
    includeDrafts: boolean = false
): Promise<PostMetaData[]> {
    try {
        const db = getFirestore(firebaseApp);
        let querySnapshot: QuerySnapshot;
        if (includeDrafts) {
            querySnapshot = await getDocs(collection(db, 'posts'));
        } else {
            const q = query(
                collection(db, 'posts'),
                where('isDraft', '!=', true)
            );
            querySnapshot = await getDocs(q);
        }

        const postArray: PostMetaData[] = [];
        querySnapshot.forEach((doc) => {
            const postMetaData: PostMetaData = PostMetaData_z.parse({
                ...doc.data(),
                published: doc.data().published.toDate().toISOString(),
                id: doc.id,
            });

            postArray.push(postMetaData);
        });

        return postArray;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function fb_getFeaturedPostsMetaDataList(
    firebaseApp: FirebaseApp
) {
    const db = getFirestore(firebaseApp);
    let querySnapshot: QuerySnapshot;
    const q = query(
        collection(db, 'posts'),
        where('isDraft', '!=', true),
        where('featured', '==', true)
    );
    querySnapshot = await getDocs(q);

    const postArray: PostMetaData[] = [];
    querySnapshot.forEach((doc) => {
        const postMetaData: PostMetaData = PostMetaData_z.parse({
            ...doc.data(),
            published: doc.data().published.toDate().toISOString(),
            id: doc.id,
        });

        postArray.push(postMetaData);
    });

    return postArray;
}

export async function fb_getAllPostsId(firebaseApp: FirebaseApp) {
    const db = getFirestore(firebaseApp);
    const q = query(collection(db, 'posts'), where('isDraft', '!=', true));
    const querySnapshot = await getDocs(q);

    const postArray: GetStaticPathsResult<{ id: string }>['paths'] = [];
    querySnapshot.forEach((doc) => {
        postArray.push({
            params: {
                id: doc.id,
            },
        });
    });

    return postArray;
}

export async function fb_getPostData(
    firebaseApp: FirebaseApp,
    postId: string
): Promise<PostData | null> {
    const db = getFirestore(firebaseApp);
    const docSnap = await getDoc(doc(db, 'posts', postId));

    if (docSnap.exists()) {
        const postMetaData: PostMetaData = PostMetaData_z.parse({
            ...docSnap.data(),
            published: docSnap.data().published.toDate().toISOString(),
            id: postId,
        });

        return {
            ...postMetaData,
            content: docSnap.data().content,
        };
    }

    return null;
}

export async function fb_getAllTagsList(
    firebaseApp: FirebaseApp,
    language: string
) {
    const tagMap: Record<string, number> = {};

    const db = getFirestore(firebaseApp);
    const q = query(collection(db, 'posts'), where('isDraft', '!=', true),where('locale','==',language));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        const tagList = doc.data().tags;
        for (let tag of tagList) {
            if (!tagMap[tag]) {
                tagMap[tag] = 0;
            }
            tagMap[tag] = tagMap[tag] + 1;
        }
    });

    return tagMap;
}

export async function fb_getMetaDataListForTag(
    firebaseApp: FirebaseApp,
    language: string,
    tag: string
) {
    const db = getFirestore(firebaseApp);
    const q = query(
        collection(db, 'posts'),
        where('isDraft', '!=', true),
        where('tags', 'array-contains', tag)
    );

    const postArray: PostMetaData[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const postMetaData: PostMetaData = PostMetaData_z.parse({
            ...doc.data(),
            published: doc.data().published.toDate().toISOString(),
            id: doc.id,
        });

        postArray.push(postMetaData);
    });

    return postArray;
}

export async function fb_savePost(
    firebaseApp: FirebaseApp,
    postData: PostData
) {
    const db = getFirestore(firebaseApp);
    // Firebase is storing dates as timestamps
    // We need to convert the date back into timestamps for proper saving
    const publishedTimeStamp = Timestamp.fromDate(new Date(postData.published));

    await setDoc(doc(db, 'posts', postData.id), {
        ...postData,
        published: publishedTimeStamp,
    });
}

export async function fb_addPost(firebaseApp: FirebaseApp): Promise<string> {
    const db = getFirestore(firebaseApp);
    const newPostData: Omit<PostData, 'id' | 'published'> & {
        published: Timestamp;
    } = {
        title: 'New Post',
        published: Timestamp.now(),
        isDraft: true,
        slug: 'new-post',
        locale: 'en',
        description: '',
        tags: [],
        content: '#Write content here',
    };
    const docRef = await addDoc(collection(db, 'posts'), newPostData);
    return docRef.id;
}

export async function fb_deletePost(firebaseApp: FirebaseApp, postId: string) {
    const db = getFirestore(firebaseApp);

    await deleteDoc(doc(db, 'posts', postId));
}

/**
 *
 * @param firebaseApp firebase App instance
 * @param pageId page slug / id
 * @param locale language in which the page is written
 * @returns a promise resolving with the markdown string with the page content
 */
export async function fb_getPageContent(
    firebaseApp: FirebaseApp,
    pageId: string,
    locale: string
): Promise<string> {
    const db = getFirestore(firebaseApp);
    const docSnap = await getDoc(doc(db, `pages/locales/${locale}`, pageId));

    if (!docSnap.exists()) {
        console.error(`Page not found for slug id ${pageId}`);
        return '';
    }

    return docSnap.data().content;
}

/**
 * Saves a page into the CRM database. If the page doesn't exist it will be created.
 *
 * @param firebaseApp firebaseApp instance
 * @param pageId ID of the page intended to be modified
 * @param locale string corresponding to the locale of the intended page
 * @param content string containing the markdown content from the page
 */
export async function fb_savePageContent(
    firebaseApp: FirebaseApp,
    pageId: string,
    locale: string,
    content: string
) {
    const db = getFirestore(firebaseApp);

    await setDoc(doc(db, `pages/locales/${locale}`, pageId), {
        content: content,
    });
}
