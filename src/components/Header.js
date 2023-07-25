import { LOGO_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");

  const onlineStatus = useOnlineStatus();

  /*While re-rendering entire component, It will find diff beteen older and new version. So suppose we are updating only button. 
    Then in diff it will be found that that there is no change in Home, About use, Contact us and other. Only change is 
    in button. So only button will be updated. Great :)

    Older virtual DOM gets compared with newer virtual DOM
  */


  // Case-1 If no dependency array => useEffect is called on every render
  // Case-2 If dependency array is empty = [] => useEffect is called on initital render(Just once)
  // Case-3 If dependency array contains [btnNameReact] then useEffect is called every time btnNameReact is updated
  useEffect(() => {
  }, [btnNameReact]);

  return (
    <div className="flex justify-between bg-pink-50 shadow-xl mb-10">
      <div className="logo-container">
        <img className="w-40" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4">
          <li className="px-4">
            Online Status: { onlineStatus ? "✅" : "🔴" }
          </li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us </Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery </Link>
          </li>
          <li>Cart</li>

          <button
            className="login"
            onClick={() => {
              /*
                As soon as button is clicked, the callback will be called and then setBtnNameReact() will be called. Then
                React will re-renders the the entire component again
              */
              setBtnNameReact(btnNameReact == "Login" ? "Logout" : "Login");
            }}
          >
            {btnNameReact}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
