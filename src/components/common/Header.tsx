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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>향기 리뷰</a>
            </li>
            <li>
              <a>제품 추천</a>
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
              <a>향기 리뷰</a>
            </li>
            <li>
              <a>제품 추천</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end flex w-full">
          <ul className="menu menu-horizontal text-base">
            <li>
              <a className="search">검색</a>
            </li>
            <li>
              <a className="login">로그인</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
