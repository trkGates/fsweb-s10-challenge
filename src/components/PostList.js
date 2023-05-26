import React, { useEffect } from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

const PostList = () => {

  const notlar = useSelector((state) => state.notlar);
  


useEffect(() => {
  console.log("NOTLAR", notlar);
}, [notlar]);

  return notlar.length === 0 ? (
    <div className="beyazKutu text-center p-6">Hiç notunuz yok</div>
  ) : (
    <div>
      {notlar.map((not) => (
        <Post item={not} key={not.id} />
      ))}
    </div>
  );
};

export default PostList;
