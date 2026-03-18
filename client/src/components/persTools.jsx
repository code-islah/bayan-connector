const Feel = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center text-darkSub hover:text-compSubYl"
    >
      <span>
        <img className="w-6 mr-1" src="/SVGs/reaction.svg" />
      </span>
      <span className="text-dark">Feel</span>
    </button>
  );
};

const Comment = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-darkSub hover:text-compSubYl"
    >
      <span className="flex gap-2">
        <img className="w-5 mr-1" src="/SVGs/comment.svg" alt="Comment" />
      </span>
      <span style={{ color: "#1E779B" }}>Comment</span>
    </button>
  );
};

const Share = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-darkSub hover:text-compSubYl"
    >
      <span>
        <img className="w-5" src="/SVGs/share.svg" alt="Share" />
      </span>
    </button>
  );
};

export { Feel, Comment, Share };
