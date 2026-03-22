import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import axios from "../API/axios.js";
import CreatePost from "../components/CreatePost.jsx";
import Post from "../components/Post.jsx";
import Comments from "../components/Comment.jsx";

const Home = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [viewPost, setViewPost] = useState(null);
  const [viewComment, setViewComment] = useState(null);
  const [viewEmoji, setViewEmoji] = useState(null);
  const [refreshPosts, setRefreshPosts] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [refreshPosts]);

  return (
    <div className="mt-14 grid gap-6">
      {/* comment section */}
      {viewComment && (
        <div className="animate-bottom-to-top fixed inset-0 bg-sec z-1000 overlay-y-auto">
          <Comments
            user={user}
            posts={posts}
            id={viewComment}
            closeComment={() => {
              setViewComment(null);
              setRefreshPosts((prev) => !prev);
            }}
          />
        </div>
      )}

      <CreatePost
        onPostCreated={(newPost) => {
          setPosts((prev) => [newPost, ...posts]);
        }}
      />

      {posts &&
        posts.map((card, idx) => (
          <Post
            key={card + idx}
            id={card._id}
            viewPost={viewPost}
            setViewPost={setViewPost}
            viewComment={viewComment}
            setViewComment={setViewComment}
            viewEmoji={viewEmoji}
            setViewEmoji={setViewEmoji}
            content={card.content}
            name={card.user.name}
            prof={card}
            profImg={card.user.profileImage}
            image={card.image}
            county={card.county}
            emoji={card.emoji}
            posts={posts}
            setPosts={setPosts}
            user={user}
          />
        ))}
    </div>
  );
};

export default Home;
