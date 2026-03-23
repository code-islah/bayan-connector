import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../API/axios.js";
import { differenceInYears } from "date-fns";

const Profile = () => {
  const { state } = useLocation();
  const { prof } = state || {};
  const [posts, setPosts] = useState([]);
  const [age, setAge] = useState(0);
  const [profile, setProfile] = useState({});
  const [viewPost, setViewPost] = useState(false);

  useEffect(() => {
    const fetchUser = async (idx) => {
      try {
        const res = await axios.get(`/auth/${idx}`);
        setProfile(res.data);

        setAge(() => {
          return differenceInYears(
            new Date(),
            new Date(res.data.birthDate.split("T")[0]),
          );
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (prof?.user._id) {
      fetchUser(prof.user._id);
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async (idx) => {
      const res = await axios.get(`/posts/user/${idx}`);
      setPosts(res.data);
    };

    if (profile._id) {
      fetchPosts(profile._id);
    }
  }, [profile._id]);

  const sendFriendRequest = async (idx) => {
  
   const token = localStorage.getItem('token');
   const res = await axios.post(`/auth/${idx}/request`, {},{
  headers: { Authorization: `Bearer ${token}` }});
   console.log(res.data);
  }
  
  
  
  

  return (
    <div className="absolute inset-0 grid px-3 h-full mt-20 pb-6 overflow-y-auto">
      <div>
        <div className="flex px-2 gap-3 rounded shadow relative z-[10]">
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage: `url(${prof?.user?.profileImage})`,
              filter: "blur(8px)",
              zIndex: "-1",
            }}
          ></div>
          <div className="grid">
            <div className="flex gap-5 pb-3 pt-2">
              <img
                className="w-13 rounded-full aspect-square outline-3 object-cover outline-[#d3c2b3] outline-offset-2"
                src={profile?.profileImage}
                alt="Profile Image"
              />
              <h2 className="text-2xl self-center text-sec underline decoration-[#d3c2b3]">
                {profile.name}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-sec shadow p-2 rounded">
          <div className="flex pb-2 items-center gap-4">
            <p className="text-darkSub rounded text-xs">
              {age ? `Age : ${age}` : 0}
            </p>
            <p className="text-compSubYl rounded text-sm">{profile.email}</p>
          </div>

          <p className="text-darkSub">
            I'm a MERN stack developer, practicing MongoDB, Express, React, and
            Node.js to build robust applications. I'm also a religious person,
            finding balance between tech and spirituality. Constantly learning
            and building projects to grow in this dynamic field.
          </p>
        </div>
        <div className="flex gap-1 mt-2 [&>span]:flex-1 [&>span]:p-2 [&>span]:text-center [&>span]:bg-[#fccb4d] [&>span]:text-[#fff] [&>span]:rounded">
        <span
        onClick={()=>{
        sendFriendRequest(profile._id);
        }}
        >Add Friend</span>
        <span>Follow</span>
        <span className="bg-compBl">Report</span>
        </div>
        
      </div>

      {/*Posts*/}
      <div className="grid gap-5 pt-3">
        {posts &&
          posts.map((post, idx) => {
            return (
              <div
                className={`${viewPost ? "h-full" : "h-fit"} bg-sec [&>*]:p-2 shadow-sm rounded`}
                key={post + idx}
              >
                <div className="flex gap-3 items-center border-b border-b-[#d3c2b3]">
                  {profile.profileImage ? (
                    <img
                      className="w-8 rounded-full aspect-square object-cover outline-[#d3c2b3] outline-2"
                      src={profile?.profileImage}
                      alt="Profile"
                    />
                  ) : (
                    ""
                  )}
                  <p className="text-dark">{profile.name}</p>
                </div>

                <div className="flex gap-1 items-center">
                  <p className="text-xs text-compSubYl">
                    Feeling {post.emoji ? post.emoji : ""}
                  </p>

                  {post.county && (
                    <p className="text-xs text-red-400">, {post.county}</p>
                  )}
                </div>

                {post.image ? (
                  <img
                    className="w-full !rounded"
                    src={post.image}
                    alt="Post"
                  />
                ) : (
                  ""
                )}

                <h1 className="py-1 pt-2 text-dark font-extrabold text-xl">
                  {post.content.split(" ").slice(0, 4).join(" ")}
                </h1>
                <p
                  onClick={() => {
                    setViewPost((prev) => !prev);
                  }}
                  className={`${viewPost ? "overflow-hidden overflow-ellipsis" : "line-clamp-3 shadow-[inset_0_-10px_10px_-10px_rgba(0,0,0,0.3)]"} text-darkSub text-sm`}
                >
                  {post.content}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Profile;
