import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const { user, setUser, loading } = useContext(UserContext);

  return (
    <div
    className="grid h-screen mt-20 relative"
    >
    <img 
    src="/logo_symbol.png"
    className="absolute top-[40%] left-[-50%] w-[200%] h-full opacity-[0.2] object-[35%_center] z-[-10]" />
      <div
        style={{ borderBottomColor: "#f5f0ee" }}
        className="self-start grid gap-1 px-3 [&>span]:py-2 [&>span]:border-b [&>span]:border-b-[#f5f0ee]"
      >
        <span className="flex gap-3 items-center">
          <img
            className="w-10 rounded-full aspect-square outline-2 outline-[#d3c2b3] outline-offset-2"
            src={user?.profileImage || '/avator.jpg'}
            alt="Profile Image"
          />
          <div className="grid">
            <span className="text-dark">{user?.name}</span>
            <span className="text-compBl text-sm">{user?.email}</span>
          </div>
        </span>
        <span className="text-dark">My Profile</span>
        <span className="text-dark">Posts</span>
        <span className="text-dark">More Settings</span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            localStorage.removeItem("token");
            setUser(null);
            navigate("/login");
          }}
          className="text-dark"
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
