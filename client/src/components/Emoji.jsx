const Emoji = ({ onClose, onSelect }) => {
  return (
    <div
      className="flex px-3 py-2 w-fit backdrop-blur-sm bg-black/20 rounded gap-2 absolute bottom-0 [&>span]:p-1 [&>span]:text-xl"
      onClick={(e) => {
        e.stopPropagation();
        if (e.target.tagName === "SPAN") {
          const emoji = e.target.textContent;
          onSelect(emoji);
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
