import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="fixed z-10 w-full navbar bg-beige p-0">
      <div className="flex w-full xl:container xl:m-auto">
        <div className="dropdown ">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-2 z-[1] p-0 shadow bg-white w-52"
          >
            <li className="hover:bg-beige">
              <Link to="/review">
                <a className="py-4">향기 리뷰</a>
              </Link>
            </li>
            <li className="hover:bg-beige">
              <Link to="/recommend">
                <a className="py-4">추천 질문</a>
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="logo ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="97"
            height="35"
            viewBox="0 0 97 35"
          >
            <text
              id="ScentOf"
              transform="translate(0 28)"
              fill="#504538"
              fontSize="26"
              fontFamily="SegoeUI-Bold, Segoe UI"
              fontWeight="700"
            >
              <tspan x="0" y="0">
                ScentOf
              </tspan>
            </text>
          </svg>
        </Link>
        <div className="navbar hidden md:flex py-0">
          <ul className="menu menu-horizontal px-1 text-md text-base">
            <li>
              <Link to="/review">
                <a>향기 리뷰</a>
              </Link>
            </li>
            <li>
              <Link to="/recommend">
                <a>추천 질문</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end flex w-full">
          <ul className="menu menu-horizontal text-base">
            <li>
              <a className="search">검색</a>
            </li>
            <li>
              <Link to="/login">
                <a className="login">로그인</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
