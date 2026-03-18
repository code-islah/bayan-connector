import { useState } from "react";

import CreatePost from "../components/CreatePost.jsx";
import Post from "../components/Post.jsx";
import Comments from "../components/Comment.jsx";

const Home = () => {
  const posts = ["header1", "header2", "header3"];
  const [viewPost, setViewPost] = useState(false);
  const [viewComment, setViewComment] = useState(false);
  const [viewEmoji, setViewEmoji] = useState(false);

  return (
    <div className="mt-14 grid gap-6">
      {/* comment section */}
      {viewComment && (
        <div className="animate-bottom-to-top fixed inset-0 bg-sec z-1000 overlay-y-auto">
          <Comments
            closeComment={() => {
              setViewComment(false);
            }}
          />
        </div>
      )}

      <CreatePost />
      {posts.map((card) => (
        <Post
          key={card}
          card={card}
          viewPost={viewPost}
          setViewPost={setViewPost}
          viewEmoji={viewEmoji}
          setViewEmoji={setViewEmoji}
          viewComment={viewComment}
          setViewComment={setViewComment}
        />
      ))}
    </div>
  );
};

export default Home;
