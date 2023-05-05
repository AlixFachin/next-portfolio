import { FirebaseApp } from "firebase/app";
import { Auth, signOut } from "firebase/auth";
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  PostData,
  PostMetaData,
  PostMetaData_z,
  markdownToHtml,
} from "./posts";

export function fb_logOut(firebaseAuth: Auth): void {
  signOut(firebaseAuth).catch((error) => console.error(error));
}

export async function fb_getPostById(
  firebaseApp: FirebaseApp,
  postId: string
): Promise<PostData | null> {
  const db = getFirestore(firebaseApp);
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  const postMetadata = PostMetaData_z.parse({
    ...docSnap.data(),
    published: docSnap.data().published.toDate().toISOString(),
    id: postId,
  });
  const contentHtml = await markdownToHtml(docSnap.data().content);

  return { ...postMetadata, contentHtml };
}

export async function fb_getAllPostsIdList(
  firebaseApp: FirebaseApp
): Promise<PostMetaData[]> {
  const db = getFirestore(firebaseApp);
  const querySnapshot = await getDocs(collection(db, "posts"));

  const postArray: PostMetaData[] = [];
  querySnapshot.forEach((doc) => {
    console.log(`The published date is: ${doc.get("published").toDate()}`);
    const postMetaData: PostMetaData = PostMetaData_z.parse({
      ...doc.data(),
      published: doc.data().published.toDate().toISOString(),
      id: doc.id,
    });

    postArray.push(postMetaData);
  });

  return postArray;
}
