import { useState } from "react";

const CommentComp = ({ closeComment }) => {
  const [comments, setComments] = useState([
    { id: 1, text: "Great post!", author: "John Doe" },
    { id: 2, text: "Love it!", author: "Jane Doe" },
  ]);
  const [newComment, setNewComment] = useState("");

  const handlePostComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: Date.now(), text: newComment, author: "You" },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="p-4 rounded shadow-sm bg-gradient-1 h-screen">
      <div
        className="absolute top-3 right-3 text-2xl text-dark"
        onClick={closeComment}
      >
        &times;
      </div>

      <div className="mb-4">
        {comments.map((comment) => (
          <div key={comment.id} className="mb-2">
            <p className="font-bold">{comment.author}</p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
        className="w-full p-2 border border-gray-300 rounded"
      />
      <div className="flex justify-end gap-2 mt-2">
        <button className="px-5 py-1 text-primary bg-red-400 rounded">
          <img className="w-3" src="/SVGs/cancel.svg" alt="Share" />
        </button>
        <button
          onClick={handlePostComment}
          className="rounded px-5 py-1 bg-compYl text-dark"
        >
          <img className="w-6" src="/SVGs/send.svg" alt="Share" />
        </button>
      </div>
    </div>
  );
};

export default CommentComp;
