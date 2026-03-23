// Post.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Feel, Comment, Share } from "./persTools.jsx";
import Emoji from "./Emoji.jsx";
import axios from "../API/axios.js";

const Post = ({
  id,
  viewPost,
  setViewPost,
  viewEmoji,
  setViewEmoji,
  viewComment,
  setViewComment,
  content,
  name,
  prof,
  profImg,
  image,
  county,
  emoji,
  setPosts,
  posts,
  user,
}) => {
  const [userEmoji, setUserEmoji] = useState(null);
  const [emojiCount, setEmojiCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => e.stopPropagation();
    setViewEmoji(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const post = posts.find((p) => p._id === id);

    setEmojiCount(post.likes.length);
    setCommentCount(post.comments.length);

    const emoj = post.likes.find((like) => {
      return like?.user === user?._id;
    })?.emoji;

    setUserEmoji(emoj);
  }, [id, posts, user]);

  const handleReact = async (postId, emoji) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `/posts/${postId}/like`,
      { emoji },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        return post._id === id ? { ...post, likes: res.data.likes } : post;
      });
    });

    const matchedEmoji = res.data.likes.find((like) => {
      return like.user === user._id;
    }).emoji;

    setUserEmoji(matchedEmoji);
  };

  return (
    <div
      className={`grid grid-cols-1 bg-gradient-1 justify-between pt-5 px-3 py-2 shadow-sm border-b-2 border-gray-300 ${
        viewPost === id
          ? "fixed top-0 w-full h-full z-100 overflow-y-auto backdrop-blur-[100px]"
          : ""
      }`}
    >
      {viewPost && (
        <div
          className="absolute top-3 right-3 text-3xl text-dark"
          onClick={(e) => {
            e.stopPropagation();
            setViewPost(null);
          }}
        >
          &times;
        </div>
      )}
      <div
        className="flex gap-3 pb-2 border-b border-b-[#f3edeb] rounded"
      >
        <div className="relative">
          <img
            onClick={(e) => {
          e.stopPropagation();
          navigate("/profile", { state: { prof } });
        }}
            className="rounded w-10 rounded-full aspect-square outline-2 outline-[#fccb4d] outline-offset-1 object-cover"
            src={profImg}
            alt="profile"
          />
        </div>
        <div>
          <p
          onClick={(e) => {
          e.stopPropagation();
          navigate("/profile", { state: { prof } });
        }}
          className="text-dark">{name}</p>
          <p className="text-darkSub font-light text-sm">User</p>
        </div>
      </div>
      <div
        onClick={() => {
          setViewPost(id);
        }}
      >
        <div className="whitespace-nowrap flex gap-2 left-0 top-10 mt-1">
          <p className="text-[10px] text-darkSub">
            {" "}
            {emoji ? "Feeling " + emoji + " " : ""}
          </p>
          <p className="text-[10px] text-darkSub">
            {county ? "at" : ""}{" "}
            <span className="text-red-400">{county ? county : ""}</span>
          </p>
        </div>
        <div className="mt-2">
          {image && <img className="w-full rounded" src={image} alt="Place" />}
        </div>
        <div>
          <h1 className="py-1 pt-2 text-dark font-extrabold text-xl">
            {content.split(" ").slice(0, 4).join(" ") + "..."}
          </h1>
          <p
            className={`${viewPost ? "" : "line-clamp-2"} text-darkSub text-sm`}
          >
            {content}
          </p>
        </div>
      </div>
      <div className="flex pt-4 justify-between gap-1">
        <div className="flex gap-3 relative items-center">
          <div className="flex items-center gap-[2px]">
            <Feel
              emoji={userEmoji}
              onClick={(e) => {
                e.stopPropagation();
                setViewEmoji(id);
              }}
            />

            {emojiCount > 0 && (
              <div className="text-darkSub text-sm self-center">
                {emojiCount}
              </div>
            )}
          </div>
          <Comment
            onClick={(e) => {
              e.stopPropagation();
              setViewComment(id);
            }}
          />

          {commentCount > 0 && (
            <div className="text-compBl -indent-2 text-sm self-center">
              {commentCount}
            </div>
          )}

          {viewEmoji === id && (
            <Emoji
              onSelect={(emoj) => {
                return handleReact(id, emoj);
              }}
              onClose={() => setViewEmoji(false)}
            />
          )}
        </div>
        <Share />
      </div>
    </div>
  );
};

export default Post;
