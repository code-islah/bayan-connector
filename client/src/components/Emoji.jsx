const Emoji = ({ onClose }) => {
  return (
    <div
      className="flex px-3 py-2 w-fit backdrop-blur-md bg-darkSub rounded gap-2 absolute bottom-0 [&>span]:p-1 [&>span]:text-xl"
      onClick={(e) => {
        if (e.target.tagName === "SPAN") {
          onClose();
        }
      }}
    >
      <span role="img" aria-label="Like">
        👍
      </span>
      <span role="img" aria-label="Love">
        ❤️
      </span>
      <span role="img" aria-label="Haha">
        😂
      </span>
      <span role="img" aria-label="Wow">
        😮
      </span>
      <span role="img" aria-label="Sad">
        😔
      </span>
      <span role="img" aria-label="Angry">
        😡
      </span>
    </div>
  );
};

export default Emoji;
