import { useContext, useEffect, useState } from "react";

import { FirebaseAppContext } from "@/contexts/fbAppProvider";
import { FirebaseUserContext } from "@/contexts/fbUserProvider";

import LoginScreen from "./login";
import EditablePostList from "./EditablePostList";

import { PostMetaData } from "@/lib/posts";
import { fb_getAllPostsMetaDataList } from "@/lib/firebase";

const AdminPostList = () => {
  const user = useContext(FirebaseUserContext);
  const firebaseApp = useContext(FirebaseAppContext);
  const [postList, setPostList] = useState<PostMetaData[]>([]);

  const refreshList = () => {
    fb_getAllPostsMetaDataList(firebaseApp, true).then((postList) => {
      setPostList(postList);
    });
  };

  useEffect(() => {
    fb_getAllPostsMetaDataList(firebaseApp, true).then((postList) => {
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
    <div className="flex flex-col">
      <div className="bg-orange-300" role="button" onClick={refreshList}>
        Refresh
      </div>
      <EditablePostList postList={postList} refreshList={refreshList} />
    </div>
  );
};

export default AdminPostList;
