import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="z-100 fixed top-0 w-full">
      <div className="flex justify-between items-center w-full px-1 bg-primary border-b-dark shadow">
        <div>
          <Link to="/" className="text-xl font-bold text-gray-800">
            <img className="w-25" src="/logo.png" alt="Bayan Connector" />
          </Link>
        </div>
        <div>
          <ul className="flex gap-4">
            <li className="center">
              <Link to="/" className="text-gray-600 hover:text-gray-800 ">
                <img className="w-7" src="/SVGs/feed.svg" alt="Home" />
              </Link>
            </li>
            <li className="center">
              <Link to="/friends" className="text-gray-600 hover:text-gray-800">
                <img className="w-7" src="/SVGs/friends.svg" alt="Friends" />
              </Link>
            </li>
            <li className="center">
              <Link
                to="/conversations"
                className="text-gray-600 hover:text-gray-800"
              >
                <img className="w-7" src="/SVGs/msg.svg" alt="Message" />
              </Link>
            </li>

            <li className="center">
              <Link
                to="/notifications"
                className="text-gray-600 hover:text-gray-800"
              >
                <img className="w-7" src="/SVGs/notice.svg" alt="Notice" />
              </Link>
            </li>

            <li className="center">
              <Link
                to="/settings"
                className="text-gray-600 hover:text-gray-800"
              >
                <img className="w-7" src="/SVGs/settings.svg" alt="Settings" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
