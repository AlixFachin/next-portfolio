import { useContext, useEffect, useState } from "react";

import { FirebaseAppContext } from "@/contexts/fbAppProvider";
import { FirebaseUserContext } from "@/contexts/fbUserProvider";

import LoginScreen from "./login";
import EditablePostList from "./EditablePostList";

import { PostMetaData } from "@/lib/posts";
import { fb_getAllPostsIdList } from "@/lib/firebase";

const AdminPostList = () => {
  const user = useContext(FirebaseUserContext);
  const firebaseApp = useContext(FirebaseAppContext);
  const [postList, setPostList] = useState<PostMetaData[]>([]);

  useEffect(() => {
    fb_getAllPostsIdList(firebaseApp).then((postList) => {
      setPostList(postList);
    });
  }, []);

  if (!user) {
    return (
      <div>
        <p>
          You are not logged in!
          <br />
          Please authenticate
        </p>
        <LoginScreen />
      </div>
    );
  }

  return (
    <div>
      <p>{user.displayName}</p>
      <EditablePostList postList={postList} />
    </div>
  );
};

export default AdminPostList;
