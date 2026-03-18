// Post.js
import React from "react";
import { Feel, Comment, Share } from "./persTools.jsx";
import Emoji from "./Emoji.jsx";

const Post = ({
  card,
  viewPost,
  setViewPost,
  viewEmoji,
  setViewEmoji,
  viewComment,
  setViewComment,
}) => {
  return (
    <div
      key={card}
      className={`grid grid-cols-1 bg-gradient-1 justify-between pt-5 px-3 py-2 shadow-sm ${
        viewPost ? "fixed top-0 w-full h-full z-1000 overflow-y-auto" : ""
      }`}
    >
      {viewPost && (
        <div
          className="absolute top-3 right-3 text-2xl text-dark"
          onClick={() => {
            setViewPost(false);
          }}
        >
          &times;
        </div>
      )}
      <div className="flex gap-3">
        <div className="relative">
          <img className="rounded w-10" src="/prof.jpg" alt="profile" />
        </div>
        <div>
          <p className="text-dark">Md Alamin</p>
          <p className="text-darkSub font-light text-sm">
            A new web developer{" "}
          </p>
        </div>
      </div>
      <div
        onClick={() => {
          setViewPost(true);
        }}
      >
        <div className="whitespace-nowrap flex gap-2 left-0 top-10 mt-1">
          <p className="text-[10px] text-darkSub">Feeling 🥰,</p>
          <p className="text-[10px] text-darkSub">
            at <span className="text-red-400">Chuadanga Sadar Upazilla</span>
          </p>
        </div>
        <div className="mt-2">
          <img className="w-full rounded" src="/place.jpg" alt="Place" />
        </div>
        <div>
          <h1 className="py-1 pt-2 text-dark font-extrabold text-xl">
            {card} I am Md Alamin
          </h1>
          <p
            className={`${viewPost ? "" : "line-clamp-2"} text-darkSub text-sm`}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore,
            nemo. Rem cum, earum magni modi provident, eum iusto ipsa minima sed
            repudiandae sint magnam nihil. Dolore rem sequi, nihil accusamus
            voluptatum quaerat nam hic eum deleniti non facere in praesentium
            rerum beatae, perspiciatis temporibus et laudantium quibusdam iste
            facilis corrupti unde dolores.
          </p>
        </div>
      </div>
      <div className="flex pt-4 justify-between gap-1">
        <div className="flex gap-3">
          <Feel
            onClick={() => {
              setViewEmoji(true);
            }}
          />
          <Comment
            onClick={() => {
              setViewComment(true);
            }}
          />
          {viewEmoji && <Emoji onClose={() => setViewEmoji(false)} />}
        </div>
        <Share />
      </div>
    </div>
  );
};

export default Post;
