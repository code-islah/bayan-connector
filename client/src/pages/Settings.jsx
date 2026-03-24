import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "../API/axios.js";
import useTitle from '../hooks/useTitle';



function Settings() {
  const navigate = useNavigate();
  const { user, setUser, loading } = useContext(UserContext);
  const [prof, setProf] = useState({});
  useTitle('Settings');

  const [sentReqs, setSentReqs] = useState(0);
  const [friends, setFriends] = useState(0);
  const [postCount, setPostCount] = useState(0);
  
  useEffect(() => {
    const getFriendReqs = async () => {
      const res = await axios.get("/auth/sendReqs");

      setSentReqs(res.data.sentRequests.length);
    };

    getFriendReqs();
  }, []);
  
  
   
   useEffect(()=>{ 
    const getFriends = async () => {
    const res = await axios.get("/auth/friends");
    
    setFriends(res.data.friends.length);
  }

   getFriends();
   },[])
  

  
  useEffect(() => {
    const fetchPosts = async (idx) => {
      const res = await axios.get(`/posts/user/${idx}`);
      setProf(res.data[0]);
      setPostCount(res.data.length);
    };

    if (user._id) {
      fetchPosts(user._id);
    }
  }, [user]);

  if (!prof) return;

  return (
    <div className="grid h-screen mt-20 relative">
      <img
        src="/logo_symbol.png"
        className="absolute top-[40%] left-[-50%] w-[200%] h-full opacity-[0.2] object-[35%_center] z-[-10]"
      />
      <div
        style={{ borderBottomColor: "#f5f0ee" }}
        className="self-start grid gap-1 px-3 [&>span]:py-2 [&>span]:border-b [&>span]:border-b-[#f5f0ee] [&>span]:shadow [&>span]:rounded [&>span]:pl-3 [&>span]:bg-[#f5f0ee]"
      >
        <span className="flex gap-3 items-center">
          <img
            className="w-10 rounded-full aspect-square outline-2 outline-[#d3c2b3] outline-offset-2 object-cover"
            src={user?.profileImage || "/avator.jpg"}
            alt="Profile Image"
          />
          <div className="grid">
            <span className="text-dark">{user?.name}</span>
            <span className="text-compBl text-sm">{user?.email}</span>
          </div>
        </span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            navigate("/profile", { state: { prof } });
          }}
          className="text-dark"
        >
          My Profile
        </span>
        <span className="text-dark">Posts
        <span
        className="absolute ml-1 bg-red-400 text-white rounded-full aspect-square text-sm w-5 h-5 text-bold text-center"
        >{postCount ? postCount : "0"}</span>
        </span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            navigate("/friends");
          }}
          className="text-dark"
        >
          Friends
          <span
        className="absolute ml-1 bg-red-400 text-white rounded-full aspect-square text-sm w-5 h-5 text-bold text-center"
        >{friends ? friends : "0"}</span>
        </span>
        <span
          className="relative"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/sent-requests");
          }}
          className="text-dark"
        >
        Sent Requests
        <span
        className="absolute ml-1 bg-red-400 text-white rounded-full aspect-square text-sm w-5 h-5 text-bold text-center"
        >{sentReqs ? sentReqs : "0"}</span>
        </span>
        <span className="text-dark">More Settings</span>
        <span
          className="text-red-500"
          onClick={(e) => {
            e.stopPropagation();
            localStorage.removeItem("token");
            setUser(null);
            navigate("/login");
          }}
        >
          Logout
        </span>
      </div>

      <p className="pb-5 text-center self-end text-compBl">
        @Bayan Connector {new Date().getFullYear()}
      </p>
    </div>
  );
}

export default Settings;
