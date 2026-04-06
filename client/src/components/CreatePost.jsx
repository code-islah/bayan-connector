import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import axios from "../API/axios.js";

const CreatePost = ({ onPostCreated }) => {
  const [openModal, setOpenModal] = useState(false);
  const [county, setCounty] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingOnSubmit, setLoadingSubmit] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");

  function getCounty() {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
        )
          .then((res) => res.json())
          .then((data) => {
            setCounty(data.address.county);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      },
      (error) => {
        console.error(error);
        setLoading(false);
      },
    );
  }

  const reactions = [
    { name: "Like", emoji: "👍" },
    { name: "Love", emoji: "❤️" },
    { name: "Care", emoji: "🥰" },
    { name: "Haha", emoji: "😂" },
    { name: "Wow", emoji: "😮" },
    { name: "Sad", emoji: "😢" },
    { name: "Angry", emoji: "😡" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("county", county);
      formData.append("emoji", emoji);

      if (image) {
        formData.append("image", image);
      }

      const token = localStorage.getItem("token");

      const res = await axios.post("/posts", formData, {
        headers: { Authorization: "Bearer " + token },
      });

      if (res.data.success) {
        setContent("");
        setImage(null);
        onPostCreated(res.data.post);
        setLoadingSubmit(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative h-[140px] p-2 grid mx-2 shadow-sm rounded mt-3"
    >
      <textarea
        value={content}
        className="resize-none p-2 w-full my-2 h-[80px] bg-sec rounded text-dark"
        type="text"
        placeholder="Share the Eloquence of Your Heart!"
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenModal((prev) => !prev);
            }}
          >
            <img src="/SVGs/plus.svg" alt="Plus" className="w-6" />
          </button>

          <div
            className={`absolute z-10 transition-all shadow-sm bg-sec/30 rounded backdrop-blur-sm flex gap-2 bottom-[-30px] duration-300 ${openModal ? "max-w-[300px]" : "max-w-0 pointer-events-none"}`}
          >
            {reactions.map((rect) => {
              return (
                <div
                  className={`p-1 text-xl transition-all duration-300
      ${openModal ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
      hover:scale-125`}
                  key={rect.name}
                  title={rect.name}
                  onClick={() => {
                    setEmoji(rect.emoji);
                    setOpenModal(false);
                  }}
                >
                  {rect.emoji}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              getCounty();
            }}
          >
            <img src="/SVGs/location.svg" alt="Location" className="w-6" />
          </button>

          <button type="button" className="relative">
            <img
              className="w-8"
              src={!image ? "/SVGs/uploadIMG.svg" : "/SVGs/uploaded.svg"}
              alt="Upload"
            />
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              className="
          max-w-[40px]
          absolute opacity-0 border right-0 top-0 overflow-hidden z-1"
              type="file"
            />
          </button>

          {loading && (
            <div>
              <img className="w-6" src="/SVGs/spin.svg" />
            </div>
          )}

          {!loading && (county.length > 0 || emoji.length > 0) && (
            <div className="text-[10px] grid">
              <span>Feeling {emoji ? emoji : "👍"}</span>
              <span>
                At <span className="text-red-400">{county}</span>
              </span>
            </div>
          )}
        </div>
        <button type="submit" className="rounded px-5 py-1 bg-compYl text-dark">
          <img
            className="w-6"
            src={`/SVGs/${loadingOnSubmit ? "spin.svg" : "send.svg"}`}
            alt="Share"
          />
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
