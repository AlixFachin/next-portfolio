import { useContext, useEffect, useState } from "react";

import { FirebaseAppContext } from "@/contexts/fbAppProvider";
import { FirebaseUserContext } from "@/contexts/fbUserProvider";

import LoginScreen from "./login";
import EditablePostList from "./EditablePostList";

import { PostMetaData } from "@/lib/posts";
import { fb_getAllPostsMetaDataList } from "@/lib/firebase";
import LogoutButton from "./LogoutButton";

const AdminPostList = () => {
  const user = useContext(FirebaseUserContext);
  const firebaseApp = useContext(FirebaseAppContext);
  const [postList, setPostList] = useState<PostMetaData[]>([]);
  const [error, setError] = useState<string>("");

  const refreshList = () => {
    if (user) {
      fb_getAllPostsMetaDataList(firebaseApp, true)
        .then((postList) => {
          setError("");
          setPostList(postList);
        })
        .catch((reason) => {
          console.error(`Error during post download: \n ${reason}`);
          setError(reason.message ? reason.message : `Server error ${reason}`);
        });
    }
  };

  useEffect(() => {
    if (user) {
      fb_getAllPostsMetaDataList(firebaseApp, true)
        .then((postList) => {
          setError("");
          setPostList(postList);
        })
        .catch((reason) => {
          console.error(`Error during post download: \n ${reason}`);
          setError(reason.message ? reason.message : `Server error ${reason}`);
        });
    }
  }, [user]);

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

  if (error) {
    return (
      <div>
        <p>
          Error during data download!
          <br />
          Please logout and try again...
        </p>
        <LogoutButton />
      </div>
    );
  }

  return (
    <div className="flex flex-col">      
      <EditablePostList postList={postList} refreshList={refreshList} />
    </div>
  );
};

export default AdminPostList;
