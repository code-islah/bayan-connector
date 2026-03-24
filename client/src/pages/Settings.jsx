import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "../API/axios.js";
import useTitle from '../hooks/useTitle';
import { motion, useMotionValue, animate } from "framer-motion";


function Settings() {

  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState(null);
  
  const handleUpdate = async () => {
    
    const formData = new FormData();
    formData.append("name", newName);
  if (newImage) formData.append("image", newImage);
  
   const token = localStorage.getItem("token");
    
    try {
    const res = await axios.put("/auth/update", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });

    console.log(res.data);

  } catch (err) {
    console.error(err);
  }    
  }
  
  const [showMoreSettings, setShowMoreSettings] = useState(false);
  const y = useMotionValue(window.innerHeight);

// animate IN when opened
useEffect(() => {
  if (showMoreSettings) {
    animate(y, 0, {
      type: "spring",
      stiffness: 150,
      damping: 25,
    });
  }
}, [showMoreSettings]);

const handleDragEnd = (event, info) => {
  const shouldClose =
    info.offset.y > 150 || info.velocity.y > 800;

  if (shouldClose) {
    animate(y, window.innerHeight, {
      type: "spring",
      stiffness: 200,
      damping: 30,
      onComplete: () => {
        setShowMoreSettings(false);
        y.set(window.innerHeight); // reset for next open
      },
    });
  } else {
    animate(y, 0, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
  }
};
  
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
  
  
  const handleDeleteAccount = async () => {
  const token = localStorage.getItem('token');
  if (!window.confirm("Are you sure? This cannot be undone.")) return;
  try {
    await axios.delete("/auth/delete", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // logout user
    localStorage.removeItem("token");
    window.location.href = "/login";

  } catch (err) {
    console.error(err);
  }
};
  
  


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
          className="relative text-dark"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/sent-requests");
          }}
          
        >
        Sent Requests
        <span
        className="absolute ml-1 bg-red-400 text-white rounded-full aspect-square text-sm w-5 h-5 text-bold text-center"
        >{sentReqs ? sentReqs : "0"}</span>
        </span>
        <span
        onClick={()=>{
        setShowMoreSettings(true);
        }}
        className="text-dark">More Settings</span>
        
        {showMoreSettings && (
  <motion.div
    drag="y"
    dragConstraints={{ top: 0, bottom: 0 }}
    style={{ y }}
    onDragEnd={handleDragEnd}
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    exit={{ y: "100%" }}
    className="bg-sec border border-[#787f8d] shadow z-[100] w-full h-[90vh] fixed bottom-0 left-0 rounded-t-2xl p-4"
  >
    {/* Drag handle */}
    <div className="w-12 h-1 bg-dark mx-auto mb-4 rounded-full" />

    <p className="text-dark">More Settings Content</p>
    <div className="mt-3 [&>span]:bg-white [&>span]:rounded grid gap-3 [&>span]:px-3 [&>span]:py-2 [&>span]:text-[#393e4b] [&>span]:shadow">
    <div className="flex gap-3 items-center">
     <img
     className="outline-[#fff] shadow-md outline-2 w-10 aspect-square object-cover rounded-full"
     src={user?.profileImage || "/avator.jpg"}
      alt="Profile" />
     <span className="text-dark relative">Change Profile Picture
     <input
     onChange={(e)=>{
     setNewImage(e.target.files[0]);
     }}
     type="file" className="absolute inset-0 opacity-0" />
     </span>
     </div>
     <input
     onChange={(e)=>{
     setNewName(e.target.value);
     }}
     className="px-3 py-2 bg-white shadow rounded" type="text" placeholder="Change User Name" />
     <span>Edit/Add Status</span>
     <span>Edit Birth Date</span>
     <div className="flex gap-1 pt-2 [&>button]:flex-1 [&>button]:px-3 [&>button]:py-2 [&>button]:text-[#393e4b]">
     <button className="bg-compBl rounded">Cancel</button>
     <button
     onClick={handleUpdate}
     className='bg-compYl rounded'>Confirm</button>
     </div>
     <span
     onClick={()=>{
     handleDeleteAccount();
     }}
     className='!bg-red-400 text-sec'>Delete Account</span>
    </div>
  </motion.div>
)}
        
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
