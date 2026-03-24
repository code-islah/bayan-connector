import { Fragment, useState, useEffect } from "react";
import axios from "../API/axios.js";
import useTitle from '../hooks/useTitle';

function PendingFriends() {
  const [friends, setFriends] = useState([]);
  useTitle("Pending Friend Requests");
  useEffect(() => {
    const getFriendReqs = async () => {
      const res = await axios.get("/auth/sendReqs");

      setFriends(res.data.sentRequests);
    };

    getFriendReqs();
  }, []);

  return (
    <Fragment>
      <div className="h-screen mt-20">
        <h1 className="pl-3 pb-3 text-darkSub text-2xl">Pending Friends:</h1>
        {friends.length !== 0 ? (
          friends.map((fr, idx) => {
            return (
              <div
                className="mx-3 mb-1 bg-sec h-fit rounded text-darkSub shadow"
                key={fr + idx}
              >
                <div className="flex items-center gap-2 p-2">
                  <span>
                    <img
                      className="w-10 rounded-full object-cover aspect-square"
                      src={fr.profileImage}
                      alt="Profile"
                    />
                  </span>
                  <div className="grid">
                    <span className="text-dark">{fr.name}</span>
                    <span className="text-compBl text-xs">{fr.email}</span>
                  </div>
                  <div className="ml-auto flex gap-3">
                    <img className="w-6" src="/SVGs/sendMsg.svg" alt="Send" />
                    <img
                      className="w-6"
                      src="/SVGs/cancelFriend.svg"
                      alt="Cencel"
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h1 className="text-center text-dark">
              You haven't sent any friend requests yet!
            </h1>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default PendingFriends;
