import React, { useEffect, useState } from "react";
import studyNotion from "../../assets/studyNotion.png";
import { Link, matchPath, matchRoutes, useLocation } from "react-router-dom";
import { navbarLinks } from "../../data/navbarLinks.js";
import { use } from "react";
import { useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import ProfileDropDown from "../auth/ProfileDropDown.jsx";
import { apiConnector } from "../../services/apiConnector.js";
import { categories } from "../../services/apis.js";
import { FaAngleDown } from "react-icons/fa";

const NavBar = () => {

  const {token} = useSelector((state) => state.auth);
  const {totalItems} = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.profile);

  const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async () => {
    try {
      const response = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(response.data.categories);
      //console.log("printing subLists", response.data.categories);
    } catch (error) {
      console.log("error in fetching subLinks");
    }
  };

  useEffect( () => {
    fetchSubLinks();
  },[])

  const location = useLocation();
  const matchRoutes = (route) => {
    return matchPath({path: route}, location.pathname);
  }
  return (
    <div className="text-white w-full flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 transition-all duration-200">
      <div className="border-1 w-11/12 max-w-maxContent flex justify-between items-center">
        {/* image */}
        <Link to="/">
          <img src={studyNotion} alt="studyNotion logo" />
        </Link>

        {/* nav links */}
        <nav>
          <ul className="flex gap-6">
            {navbarLinks.map((link, index) => (
              <li key={index}>
                {link.title == "Catalog" ? (
                  <div className="relative flex items-center gap-2 group">
                    <p>{link.title}</p>
                    <FaAngleDown />

                    <div
                      className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[1.6em] top-[50%] flex flex-col rounded-md bg-white p-4 text-black opacity-0 group-hover:opacity-100 
                    group-hover:visible transition-opacity duration-200 lg:w-[300px]"
                    >
                      <div className="absolute left-[50%] top-0 transalate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-white"></div>

                      {subLinks.length > 0 ? (
                        subLinks.map((subLink, subIndex) => (
                          <Link to={subLink.path} key={subIndex}>
                            <p className="text-black font-medium p-2 hover:bg-gray-200">{subLink.name}</p>
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoutes(link?.path)
                          ? "text-yellow-300"
                          : "text-white"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* login/signup/profile */}
        <div className="flex gap-x-4 items-center text-gray-300 text-md">
          {user && user != "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <FaCartShopping />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-300 text-richblack-800 rounded-full px-1 text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link
              to="/login"
              className="bg-slate-800 px-4 py-2 rounded-md border-[1px] border-slate-700"
            >
              <button>Log in</button>
            </Link>
          )}
          {token === null && (
            <Link
              to="/signup"
              className="bg-slate-800 px-4 py-1 rounded-md border-[1px] border-slate-700"
            >
              <button>Sign Up</button>
            </Link>
          )}
          {token != null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
