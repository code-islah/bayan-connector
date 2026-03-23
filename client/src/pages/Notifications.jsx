import {useState, useEffect} from "react";
import axios from "../API/axios.js";



function Notifications() {

   const [incomings, setIncomings] = useState([]);
   const [toggleEffect, setToggleEffect] = useState(false);

   const accept = async (idx) => {
    
    const res = await axios.put(`/auth/${idx}/accept`, {});
    console.log(res.data);
   }
   
   const reject = async (idx) => {
   
   const res = await axios.put(`/auth/${idx}/reject`, {});
   console.log(res.data);
   }
   
   
   useEffect(()=>{
    const getFriendReqs =async ()=> {
   
   const res = await axios.get("/auth/receivedReqs");
   
   setIncomings(res.data.receivedRequests);
   
   }
   
   getFriendReqs();
   },[toggleEffect])
   
 
   
   return (
     <div className="h-screen mt-20">
     <h1 className="pl-3 pb-3 text-darkSub text-2xl">Notifications :</h1>
     {incomings.length !== 0 ? incomings.map((fr,idx) => {
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
      accept(fr._id);
      setToggleEffect(prev => !prev);
      }}
      className="w-6" src="/SVGs/check.svg" alt="Send" />
      <img
      onClick={()=>{
      reject(fr._id);
      setToggleEffect(prev => !prev);
      }}
      className="w-6" src="/SVGs/unCheck.svg" alt="Cencel" />
      </div>
      </div>

      </div>
      })  : (<div><h1 className="text-center text-dark">You haven't sent any friend requests yet!</h1></div>)}
     
     </div>
   );
}

export default Notifications;
