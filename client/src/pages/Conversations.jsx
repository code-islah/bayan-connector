import { Fragment, useState, useEffect, useContext } from "react";
import axios from "../API/axios.js";
  import { useNavigate } from "react-router-dom";
  import {UserContext} from "../context/UserContext.jsx";

function Conversations() {

   const {user} = useContext(UserContext);
   const navigate = useNavigate();
   const [friends, setFriends] = useState([]);
 
   useEffect(()=>{ 
    const getFriends = async () => {
    const res = await axios.get("/auth/friends");
    
    setFriends(res.data.friends);
  }

   getFriends();
   },[])
   
   
   const handleUnfriend = async (idx) => {

  try {
    await axios.put(`/auth/${idx}/unfriend`, {});

  } catch (err) {
    console.error(err);
  }
};
   
   
  return (
    <Fragment>
      <div className="h-screen mt-18">
     
      <h1 className="pl-3 pb-3 text-darkSub text-2xl">Conversations:</h1>
      {friends.length !== 0 ? friends.map((fr,idx) => {
      return <div
      className="mx-3 mb-1 bg-sec h-fit rounded text-darkSub shadow"
      key={fr+idx}>
      
      <div className="flex items-center gap-2 p-2">
      <span><img
      className="w-10 rounded-full object-cover aspect-square"
      src={fr.profileImage} alt="Profile" /></span>
      <div className="grid">
      <span className="text-dark">{fr.name}</span>
      <span className="text-compBl text-xs">{fr.email}</span>
      </div>
      <div className="ml-auto flex gap-3">
      <img
      onClick={()=>{
      handleUnfriend(fr._id);
      }}
      className="w-6" src="/SVGs/cancelFriend.svg" alt="Remove" />
      <img
      onClick={(e)=>{
      e.stopPropagation();
      navigate("/chat",{state:{
      user: user,
      receiver: fr}});
      }}
      className="w-6" src="/SVGs/sendMsg.svg" alt="Send" />
      </div>
      </div>

      </div>
      
      }) : (<div><div><h1 className="text-center text-dark">You don't have any friends yet!</h1></div></div>)}
      </div>
      
    </Fragment>
  );
}

export default Conversations;






