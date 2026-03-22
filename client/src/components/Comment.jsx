import { useState, useEffect } from "react";
import axios from "../API/axios.js";

const CommentComp = ({ closeComment, posts, id }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const post = posts.find((com) => com._id === id);
  const author = post.user.name;

  useEffect(() => {
    setComments(post.comments);
  }, []);

  const handlePostComment = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmittingComment(true);
    const handleComment = async (id, text) => {
      const token = localStorage.getItem("token");

      const res = await axios.post(`/posts/${id}/comment`, { text });

      setComments(res.data.post.comments);
      setContent("");
      setIsSubmittingComment(false);
    };
    handleComment(id, content);
  };

  return (
    <form
      onSubmit={handlePostComment}
      className="p-4 rounded shadow-sm bg-gradient-1 h-screen overflow-y-scroll"
    >
      <div
        className="absolute top-1 right-1 text-3xl text-dark"
        onClick={closeComment}
      >
        &times;
      </div>

      <div className="mb-4">
        {comments?.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="p-2 bg-sec shadow-sm rounded mb-2 overflow-y-auto"
            >
              <div className="flex gap-2 items-center">
                <img
                  className="w-10 aspect-square h-10 rounded-full object-cover border-1 border-[#b1c1d9]"
                  src={comment.user?.profileImage}
                  alt="ProfPic"
                />
                <p className="font-bold text-dark">{comment.user?.name}</p>
              </div>

              <p className="pt-2 text-darkSub">{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="text-darkSub">Write the first comment!</p>
        )}
      </div>
      <input
        type="text"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        placeholder="Write a comment..."
        className="w-full p-2 border border-gray-300 rounded"
      />
      <div className="flex justify-end gap-2 mt-2">
        <button
          type="button"
          className="px-5 py-1 text-primary bg-red-400 rounded"
        >
          <img className="w-3" src="/SVGs/cancel.svg" alt="Share" />
        </button>
        <button type="submit" className="rounded px-5 py-1 bg-compYl text-dark">
          <img
            className="w-6"
            src={`/SVGs/${isSubmittingComment ? "spin.svg" : "send.svg"}`}
            alt="Share"
          />
        </button>
      </div>
    </form>
  );
};

export default CommentComp;
