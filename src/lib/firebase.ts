import { PostData } from "./posts";

import { FirebaseApp } from "firebase/app";
import { Auth, signOut } from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";

export function fb_logOut(firebaseAuth: Auth): void {
  signOut(firebaseAuth).catch((error) => console.error(error));
}

export async function fb_getAllPosts(
  firebaseApp: FirebaseApp
): Promise<PostData[]> {
  const db = getFirestore(firebaseApp);
  const querySnapshot = await getDocs(collection(db, "posts"));

  const postArray: PostData[] = [];
  querySnapshot.forEach((doc) => {
    postArray.push({
      draft: false,
      id: "",
      date: "2023/12/01",
      tags: [],
      description: "",
      title: doc.data().title,
      contentHtml: "",
    });
  });

  return postArray;
}
